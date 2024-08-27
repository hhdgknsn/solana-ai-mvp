// src/services/aiService.js
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import { searchFiles } from './fileSearchService';

let prompts = {};

export async function loadPrompts() {
  const promptsFilePath = path.join(__dirname, '../ai', 'prompts.json');
  try {
    const data = await fs.readFile(promptsFilePath, 'utf8');
    prompts = JSON.parse(data);
  } catch (error) {
    console.error('Error loading prompts:', error);
  }
}

// Call this function once when the server starts
loadPrompts();

// Function to build a dynamic prompt based on user input
export async function buildPrompt(userInput, assistantId, vectorStoreId) {
  const query = "Build a context-rich prompt for code generation based on previous files and user input.";
  const searchResults = await searchFiles(null, assistantId, query);

  const fileContent = searchResults.data[0]?.message?.content || ''; // Modify to properly extract content

  const { general, roles, accountDesign, instructions, securityRequirements, errorHandling, integrationPoints } = userInput;

  const projectHeader = `Project Name: ${general.projectName}\nPurpose: ${general.mvpDescription}\n\n`;

  const accounts = [...accountDesign.userAccounts, ...accountDesign.programAccounts];
  const accountsStr = accounts.map((account, index) => {
    const fieldsStr = Object.keys(account).map(field => `${field}: ${account[field]}`).join(', ');
    return `${index + 1}. ${account.accountType}: { ${fieldsStr }}`;
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

  return [
    {
      fileName: 'state.rs',
      prompt: projectHeader + prompts.accounts.replace('{{accountsStr}}', accountsStr) + '\n' + fileContent,
    },
    {
      fileName: 'instructions.rs',
      prompt: projectHeader + prompts.instructions.replace('{{instructionsStr}}', instructionsStr) + '\n' + fileContent,
    },
    {
      fileName: 'roles.rs',
      prompt: projectHeader + prompts.roles.replace('{{rolesStr}}', rolesStr) + '\n' + fileContent,
    },
    {
      fileName: 'security.rs',
      prompt: projectHeader + prompts.security.replace('{{securityStr}}', securityStr) + '\n' + fileContent,
    },
    {
      fileName: 'error_handling.rs',
      prompt: projectHeader + prompts.errorHandling.replace('{{errorHandlingStr}}', errorHandlingStr) + '\n' + fileContent,
    },
    {
      fileName: 'integration_points.rs',
      prompt: projectHeader + prompts.integrationPoints.replace('{{integrationPointsStr}}', integrationPointsStr) + '\n' + fileContent,
    }
  ];
}

// Function to request code generation from the OpenAI API
export async function generateCodeBatch(userInput, schema = null, boilerplate = null) {
  const assistantId = 'your-assistant-id'; // Replace with actual assistant ID
  const vectorStoreId = 'your-vector-store-id'; // Replace with actual vector store ID

  const prompts = await buildPrompt(userInput, assistantId, vectorStoreId);

  const context = `
You are a skilled Solana blockchain developer. Based on the provided details, generate a comprehensive Solana Anchor program in Rust.

Follow best practices and ensure the code is modular and well-structured.
  `;

  const schemaInfo = schema ? `\n\nSchema Guidance:\n${schema}` : '';
  const boilerplateInfo = boilerplate ? `\n\nBoilerplate Code:\n${boilerplate}` : '';

  const messages = prompts.map(({ fileName, prompt }) => ({
    role: 'user',
    content: `
${context}

${prompt}

${schemaInfo}
${boilerplateInfo}
    `,
    fileName
  }));

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: messages.map(msg => ({ role: 'user', content: msg.content })),
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const generatedFiles = {};
    response.data.choices.forEach((choice, index) => {
      const fileName = messages[index].fileName;
      generatedFiles[fileName] = choice.message.content.trim();
    });

    return generatedFiles;
  } catch (error) {
    console.error('Error generating code with OpenAI:', error);
    throw error;
  }
}
