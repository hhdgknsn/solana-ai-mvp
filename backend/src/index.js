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

const mvpInfoFilePath = path.join(__dirname, 'mvp-info.json');
const mvpExampleFilePath = path.join(__dirname, 'mvp-example.json');
const gpt4OutputPath = path.join(__dirname, 'gpt4_output.json');

// Ensure the directory exists and create the file if it doesn't exist
async function ensureDirectoryExists(dir) {
  try {
    await fs.access(dir);
    console.log(`Directory ${dir} exists.`);
  } catch (err) {
    console.log(`Directory ${dir} does not exist, creating...`);
    await fs.mkdir(dir, { recursive: true });
  }
}

async function ensureFileExists(file) {
  try {
    await fs.access(file);
    console.log(`File ${file} already exists.`);
  } catch (err) {
    console.log(`File ${file} does not exist, creating with empty template...`);
    await fs.writeFile(file, JSON.stringify({}), 'utf8');
    console.log(`File ${file} created with empty template.`);
  }
}

async function ensureFileExistsWithContent(file, content) {
  try {
    await fs.access(file);
    console.log(`File ${file} already exists.`);
    // Log the contents of the file if it already exists
    const data = await fs.readFile(file, 'utf8');
    console.log(`Contents of ${file}:`, data);
  } catch (err) {
    console.log(`File ${file} does not exist, creating with initial data...`);
    await fs.writeFile(file, JSON.stringify(content, null, 2), 'utf8');
    console.log(`File ${file} created with initial data.`);
  }
}

// Initialize function to ensure directory and file existence
async function initialize() {
  await ensureDirectoryExists(path.dirname(mvpInfoFilePath));

  const initialData = {
    general: {
      project_name: "",
      mvp_description: "",
      user_description: ""
    },
    account_design: {
      user_accounts: [],
      program_accounts: []
    },
    functions: [],
    security: {},
    permissions: {},
    integration_points: {},
    validation_rules: {},
    test_cases: {},
    error_handling: {},
    test_env_config: {}
  };

  await ensureFileExistsWithContent(mvpInfoFilePath, initialData);
  await ensureFileExists(gpt4OutputPath);
}

initialize().catch(err => {
  console.error('Initialization error:', err);
});

// Endpoint to save the mvp-info
app.post('/api/save', async (req, res) => {
  console.log('Endpoint /api/save was called');
  const mvpInfo = req.body;
  console.log(`Received MVP info: ${JSON.stringify(mvpInfo)}`);

  try {
    await fs.writeFile(mvpInfoFilePath, JSON.stringify(mvpInfo, null, 2));
    res.status(200).json({ message: 'MVP info saved successfully', info: mvpInfo });
  } catch (err) {
    console.error('Error writing file:', err);
    res.status(500).json({ error: 'Failed to save MVP info' });
  }
});

// New endpoint to update a specific field
app.post('/api/update-field', async (req, res) => {
  console.log('Endpoint /api/update-field was called');
  const { section, field, value } = req.body;
  console.log(`Updating field: ${section}.${field} with value: ${value}`);

  try {
    const data = await fs.readFile(mvpInfoFilePath, 'utf8');
    const mvpInfo = JSON.parse(data);
    console.log('Current MVP info before update:', mvpInfo);

    const keys = section.split('.');
    let current = mvpInfo;

    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        if (Array.isArray(current[key])) {
          current[key][field] = value;
        } else {
          current[key][field] = value;
        }
      } else {
        if (!current[key]) {
          current[key] = {};
        }
        current = current[key];
      }
    });

    await fs.writeFile(mvpInfoFilePath, JSON.stringify(mvpInfo, null, 2));
    console.log('Updated MVP info:', mvpInfo);
    res.status(200).json({ message: 'Field updated successfully', info: mvpInfo });
  } catch (err) {
    console.error('Error updating field:', err);
    res.status(500).json({ error: 'Failed to update field' });
  }
});

// Endpoint to get the mvp-info
app.get('/api/get-mvp-info', async (req, res) => {
  try {
    console.log("api/get-mvp-info has been called");
    const data = await fs.readFile(mvpInfoFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    console.log('Returning MVP info:', jsonData);
    res.status(200).json(jsonData);
  } catch (err) {
    console.error('Error reading file:', err);
    res.status(500).json({ error: 'Failed to read MVP info' });
  }
});

// Endpoint to get the mvp-example
app.get('/api/get-mvp-example', async (req, res) => {
  try {
    const data = await fs.readFile(mvpExampleFilePath, 'utf8');
    res.status(200).json(JSON.parse(data));
  } catch (err) {
    console.error('Error reading file:', err);
    res.status(500).json({ error: 'Failed to read MVP example' });
  }
});

// Function to construct the initial prompt based on the contents of mvp-example.json
function constructInitialPrompt(mvpExample) {
  const { general, account_design: accountDesign, functions } = mvpExample;

  const accounts = [...accountDesign.user_accounts, ...accountDesign.program_accounts];
  const accountsStr = accounts.map((account, index) => {
    const fieldsStr = Object.keys(account).map(field => `${field}: ${typeof account[field]}`).join(', ');
    return `${index + 1}. ${account.account_type}: { ${fieldsStr} }`;
  }).join('\n');

  const functionsStr = functions.map((func, index) => {
    const paramsStr = Object.keys(func.params).map(param => `${param}: ${func.params[param]}`).join(', ');
    return `${index + 1}. ${func.name}: ${func.description} (params: { ${paramsStr} })`;
  }).join('\n');

  return `
    You are a skilled Solana blockchain developer. Based on the provided user and program account details, generate a complete Solana Anchor program in Rust.

    Project Name: ${general.project_name}
    Purpose: ${general.mvp_description}

    Accounts:
    ${accountsStr}

    Functions:
    ${functionsStr}

    Generate the complete program including:
    - Account structures with specified fields.
    - Function implementations for each described function.
    - Error handling and validation as needed.
    - Security measures as specified.
    - Testing functions to ensure the program works as expected.
  `;
}

// Define the GPT-4 API call function
async function callGpt4Api(prompt) {
  try {
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

    console.log('API Response:', response.data);
    return response.data.choices[0].message.content.trim();
  } catch (err) {
    console.error('Error calling GPT-4 API:', err.response ? err.response.data : err.message);
    throw new Error('Failed to call GPT-4 API');
  }
}

// Endpoint to get the GPT-4 API output
app.post('/api/get-gpt4-output', async (req, res) => {
  try {
    const mvpExample = await fs.readFile(mvpExampleFilePath, 'utf8');
    const parsedExample = JSON.parse(mvpExample);
    const initialPrompt = constructInitialPrompt(parsedExample);

    // Call GPT-4 API with the initial prompt
    const generatedCode = await callGpt4Api(initialPrompt);

    // Save the generated code
    await fs.writeFile(gpt4OutputPath, generatedCode, 'utf8');

    res.status(200).json({ gpt4Output: generatedCode });
  } catch (err) {
    console.error('Error getting GPT-4 output:', err);
    res.status(500).json({ error: 'Failed to get GPT-4 output' });
  }
});

// Endpoint to get the saved GPT-4 output
app.get('/api/get-saved-output', async (req, res) => {
  try {
    const data = await fs.readFile(gpt4OutputPath, 'utf8');
    res.status(200).json({ gpt4Output: data });
  } catch (err) {
    console.error('Error reading GPT-4 output file:', err);
    res.status(500).json({ error: 'Failed to read GPT-4 output file' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend running at http://localhost:${port}`);
});
