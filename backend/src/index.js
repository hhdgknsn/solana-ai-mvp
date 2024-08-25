import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

// Function to get the file path for any JSON file
function getJsonFilePath(fileName) {
  return path.join(__dirname, `${fileName}.json`);
}

// Function to construct the initial prompt based on the contents of a JSON file
async function constructInitialPrompt() {
  const mvpExamplePath = path.join(__dirname, 'mvp-design', 'mvp-example2.json');
  try {
    const data = await fs.readFile(mvpExamplePath, 'utf8');
    const mvpExample = JSON.parse(data);
    const { general, roles, accountDesign, instructions, securityRequirements, errorHandling, integrationPoints } = mvpExample;

    const accounts = [...accountDesign.userAccounts, ...accountDesign.programAccounts];
    const accountsStr = accounts.map((account, index) => {
      const fieldsStr = Object.keys(account).map(field => `${field}: ${account[field]}`).join(', ');
      return `${index + 1}. ${account.accountType}: { ${fieldsStr} }`;
    }).join('\n');

    const instructionsStr = instructions.map((instruction, index) => {
      const paramsStr = instruction.parameters.map(param => `${param.paramName}: ${param.type}`).join(', ');
      return `${index + 1}. ${instruction.name}: ${instruction.description} (params: { ${paramsStr} })`;
    }).join('\n');

    const rolesStr = roles.map((role, index) => {
      const permissionsStr = role.permissions.join(', ');
      return `${index + 1}. ${role.roleName}: { Description: ${role.description}, Permissions: [${permissionsStr}] }`;
    }).join('\n');

    const securityStr = Object.keys(securityRequirements).map(key => `${key}: ${securityRequirements[key]}`).join(', ');

    const errorHandlingStr = `
      Global Error Codes: ${errorHandling.globalErrorCodes.join(', ')},
      Fallback Instructions: ${errorHandling.fallbackInstructions.join(', ')},
      Logging Settings: { Enable Logging: ${errorHandling.loggingSettings.enableLogging}, Log Level: ${errorHandling.loggingSettings.logLevel}, Destination: ${errorHandling.loggingSettings.logDestination} }
    `;

    const integrationPointsStr = Object.keys(integrationPoints).map(key => {
      const integrationList = integrationPoints[key].map(point => `${point}`).join(', ');
      return `${key}: [${integrationList}]`;
    }).join('\n');

    const prompt = `
You are a skilled Solana blockchain developer. Based on the provided user and program account details, generate a comprehensive Solana Anchor program in Rust that meets the following specifications.

Project Name: ${general.projectName}
Purpose: ${general.mvpDescription}

1. **Accounts**
${accountsStr}

2. **Roles**
Define the roles within the program with appropriate permissions:
${rolesStr}

3. **Instructions**
Implement the following instructions with corresponding parameters:
${instructionsStr}

4. **Security Requirements**
Adhere to the following security measures while implementing the program:
${securityStr}

5. **Error Handling**
Incorporate error handling mechanisms as detailed below:
${errorHandlingStr}

6. **Integration Points**
Ensure the program integrates smoothly with the following external services and APIs:
${integrationPointsStr}

**Project Structure**
- Organize the project into multiple files and folders for ease of management, including a 'state.rs' for account definitions, separate files for each instruction, and 'mod.rs' files for organizing instructions.

**Final Instructions**
- Generate the complete program including all account structures, functions, security features, and validation mechanisms.
- Ensure that the code follows best practices for Solana development, and it includes comprehensive testing functions.
- Make the code modular to facilitate future iterations and refinements.
- Include any additional comments or suggestions for further improvements or considerations.

Generate the code considering these specifications, and structure the project as a production-ready Solana Anchor application.
    `;

    // Save the prompt to the ai/prompt-text.json file
    const aiPromptFilePath = path.join(__dirname, 'ai', 'prompt-text.json');
    await fs.writeFile(aiPromptFilePath, JSON.stringify({ prompt }, null, 2));

    return prompt;
  } catch (err) {
    console.error('Error generating prompt text:', err);
    throw err;
  }
}

// Function to generate prompts based on schema name and contents
function generatePrompt(schemaName, schemaContents) {
  let prompt = '';

  if (schemaName.includes('state')) {
    prompt = `Generate Rust structs for Solana accounts based on the following schema. Ensure each account is accurately represented with appropriate data types and annotations suitable for Solana Anchor.\n\nSchema:\n${JSON.stringify(schemaContents, null, 2)}`;
  } else if (schemaName.includes('instruction')) {
    prompt = `Create Rust instruction handlers for a Solana Anchor program based on the following schema. Each instruction should be implemented with proper argument parsing, account validations, and business logic as specified.\n\nSchema:\n${JSON.stringify(schemaContents, null, 2)}`;
  } else if (schemaName.includes('error')) {
    prompt = `Define custom error types for a Solana Anchor program based on the following schema. Each error should have a unique code and a descriptive message.\n\nSchema:\n${JSON.stringify(schemaContents, null, 2)}`;
  } else if (schemaName.includes('processor')) {
    prompt = `Implement the main processing module for a Solana Anchor program based on the following schema. The processor should route instructions to their respective handlers and ensure correct execution flow.\n\nSchema:\n${JSON.stringify(schemaContents, null, 2)}`;
  } else if (schemaName.includes('program')) {
    prompt = `Generate the entry point and necessary configurations for a Solana Anchor program based on the following schema. Ensure proper initialization and integration of all components.\n\nSchema:\n${JSON.stringify(schemaContents, null, 2)}`;
  } else if (schemaName.includes('utils')) {
    prompt = `Create utility functions and helpers for a Solana Anchor program based on the following schema. These utilities should assist in common tasks such as account serialization, deserialization, and validation.\n\nSchema:\n${JSON.stringify(schemaContents, null, 2)}`;
  } else {
    prompt = `Based on the following schema, generate appropriate Rust code for a Solana Anchor program component. Ensure adherence to best practices and correct implementation.\n\nSchema:\n${JSON.stringify(schemaContents, null, 2)}`;
  }

  return prompt;
}

// Initialize project files based on project-template.json
async function initializeProjectFiles() {
  try {
    const templatePath = getJsonFilePath('schemas/project-template');
    const data = await fs.readFile(templatePath, 'utf8');
    const projectTemplate = JSON.parse(data);

    // Function to create files recursively based on the template
    async function createFiles(template, basePath = path.join(__dirname, 'project')) {
      for (const [key, value] of Object.entries(template)) {
        const filePath = path.join(basePath, key);
        if (typeof value === 'string') {
          // Create file if it doesn't exist
          try {
            await fs.access(filePath);
          } catch (err) {
            await fs.writeFile(filePath, value, 'utf8');
          }
        } else if (typeof value === 'object') {
          // Create directory and recurse into it
          await fs.mkdir(filePath, { recursive: true });
          await createFiles(value, filePath);
        }
      }
    }

    await createFiles(projectTemplate);

    console.log('Project files initialized based on project-template.json');
  } catch (err) {
    console.error('Error initializing project files:', err);
  }
}

// Call the function to initialize the project files on server start
initializeProjectFiles();

// Endpoint to list project files
// Endpoint to list project files in the src directory
app.get('/api/project/files', async (req, res) => {
  try {
    const projectSrcPath = path.join(__dirname, 'project', 'src');  // Look inside the 'src' subdirectory
    const files = await fs.readdir(projectSrcPath, { withFileTypes: true });
    const fileList = files
      .filter(file => file.isFile())
      .map(file => file.name);
    res.status(200).json(fileList);
  } catch (error) {
    console.error('Failed to list project files:', error);
    res.status(500).json({ error: 'Failed to list project files' });
  }
});


// Endpoint to get file content from the src directory
app.get('/api/get-file/src/:fileName', async (req, res) => {
  const { fileName } = req.params;
  try {
    const filePath = path.join(__dirname, 'project', 'src', fileName);
    const content = await fs.readFile(filePath, 'utf8');
    res.status(200).send(content);
  } catch (error) {
    console.error(`Failed to read file content for ${fileName}:`, error);
    res.status(500).json({ error: 'Failed to read file content' });
  }
});


// Endpoint to get the AI prompt
app.get('/api/get-prompt-text', async (req, res) => {
  try {
    const prompt = await constructInitialPrompt();
    res.status(200).json({ promptText: prompt });
  } catch (err) {
    console.error('Error generating prompt text:', err);
    res.status(500).json({ error: 'Failed to generate prompt text' });
  }
});

// Endpoint to get and return the contents of a JSON file
app.get('/api/get-json/:directory/:fileName', async (req, res) => {
  const { directory, fileName } = req.params;
  let filePath;

  try {
    // Determine the file path based on the directory parameter
    if (directory === 'current') {
      filePath = path.join(__dirname, `${fileName}.json`);
    } else {
      filePath = path.join(__dirname, directory, `${fileName}.json`);
    }

    console.log(`Fetching file from: ${filePath}`);

    // Check if the file exists
    try {
      await fs.access(filePath);
    } catch (err) {
      console.warn(`File not found: ${filePath}`);
      return res.status(404).json({ error: `${fileName} not found in ${directory}` });
    }

    // Read the file content
    const data = await fs.readFile(filePath, 'utf8');

    // Check if the file is empty
    if (!data) {
      console.warn(`File is empty: ${filePath}`);
      return res.status(204).json({ message: `${fileName} is empty in ${directory}` });
    }

    // Parse the JSON data
    const jsonData = JSON.parse(data);
    res.status(200).json(jsonData);
  } catch (err) {
    console.error(`Error reading ${fileName} from ${directory}:`, err);
    res.status(500).json({ error: `Failed to read ${fileName} from ${directory}` });
  }
});

// Endpoint to get the GPT-4 API output
app.post('/api/get-gpt4-output', async (req, res) => {
  try {
    const prompt = await constructInitialPrompt(); // Construct the prompt
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const generatedCode = response.data.choices[0].message.content.trim();

    // Save the generated code to gpt4_output.json
    await fs.writeFile(getJsonFilePath('gpt4_output'), generatedCode, 'utf8');

    res.status(200).json({ gpt4Output: generatedCode });
  } catch (err) {
    console.error('Error getting GPT-4 output:', err);
    res.status(500).json({ error: 'Failed to get GPT-4 output' });
  }
});

// Endpoint to list project files in the src directory
app.get('/api/project/files', async (req, res) => {
  try {
    const projectSrcPath = path.join(__dirname, 'project', 'src');  // Look inside the 'src' subdirectory
    const files = await fs.readdir(projectSrcPath, { withFileTypes: true });
    const fileList = files
      .filter(file => file.isFile())
      .map(file => file.name);
    res.status(200).json(fileList);
  } catch (error) {
    console.error('Failed to list project files:', error);
    res.status(500).json({ error: 'Failed to list project files' });
  }
});



app.get('/api/test', (req, res) => {
  console.log("Test endpoint was hit!");
  res.status(200).json({ message: "Test endpoint is working!" });
});


// Endpoint to trigger code generation
// Endpoint to trigger code generation
app.post('/api/gen-code', async (req, res) => {
  console.log("gen-code triggered!");
  try {
    const schemasPath = path.join(__dirname, 'schemas', 'examples');
    const generatedFiles = {};

    // Uncommented and processing all schemas
    const schemas = [
      'state-example.json',
      'instruction-example.json',
      'error-example.json',
      'processor-example.json',
      'program-example.json',
      'utils-example.json'
    ];

    for (const schemaName of schemas) {
      const schemaPath = path.join(schemasPath, schemaName);
      const schemaData = await fs.readFile(schemaPath, 'utf8');
      const schemaJson = JSON.parse(schemaData);

      const prompt = generatePrompt(schemaName, schemaJson);

      // OpenAI API call
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const generatedCode = response.data.choices[0].message.content.trim();

      // Determine the output file name
      let fileName = '';
      if (schemaName.includes('state')) {
        fileName = 'state.rs';
      } else if (schemaName.includes('instruction')) {
        fileName = 'instructions.rs';
      } else if (schemaName.includes('error')) {
        fileName = 'errors.rs';
      } else if (schemaName.includes('processor')) {
        fileName = 'processor.rs';
      } else if (schemaName.includes('program')) {
        fileName = 'lib.rs';
      } else if (schemaName.includes('utils')) {
        fileName = 'utils.rs';
      } else {
        fileName = `${schemaName.replace('.json', '.rs')}`;
      }

      const filePath = path.join(__dirname, 'project', 'src', fileName);
      await fs.writeFile(filePath, generatedCode, 'utf8');
      console.log(`File written: ${filePath}`);
      generatedFiles[fileName] = generatedCode;
    }

    res.status(200).json({ message: 'Code generated successfully', files: Object.keys(generatedFiles) });
  } catch (err) {
    console.error('Error generating code:', err);
    res.status(500).json({ error: 'Failed to generate code' });
  }
});



app.listen(port, '0.0.0.0', () => {
  console.log(`Backend running at http://localhost:${port}`);
});
