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

const mvpFilePath = path.join(__dirname, 'mvp-example.json');
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

// Initialize function to ensure directory and file existence
async function initialize() {
  await ensureDirectoryExists(path.dirname(mvpFilePath));
  await ensureFileExists(mvpFilePath);
  await ensureFileExists(gpt4OutputPath);
}

initialize().catch(err => {
  console.error('Initialization error:', err);
});

// Endpoint to save the mvp-example
app.post('/api/save', async (req, res) => {
  const mvpExample = req.body;
  console.log(`Received MVP example: ${JSON.stringify(mvpExample)}`);

  try {
    await fs.writeFile(mvpFilePath, JSON.stringify(mvpExample, null, 2));
    res.status(200).json({ message: 'MVP example saved successfully', example: mvpExample });
  } catch (err) {
    console.error('Error writing file:', err);
    res.status(500).json({ error: 'Failed to save MVP example' });
  }
});

// Endpoint to get the mvp-example
app.get('/api/get-mvp-example', async (req, res) => {
  try {
    const data = await fs.readFile(mvpFilePath, 'utf8');
    res.status(200).json(JSON.parse(data));
  } catch (err) {
    console.error('Error reading file:', err);
    res.status(200).json({});
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
    const mvpExample = await fs.readFile(mvpFilePath, 'utf8');
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
