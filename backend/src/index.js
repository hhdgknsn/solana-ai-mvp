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

const filePath = path.join(__dirname, 'account_design_test.json');
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
  await ensureDirectoryExists(path.dirname(filePath));
  await ensureFileExists(filePath);
  await ensureFileExists(gpt4OutputPath);
}

initialize().catch(err => {
  console.error('Initialization error:', err);
});

// Endpoint to save the account design
app.post('/api/save', async (req, res) => {
  const accountDesign = req.body;
  console.log(`Received account design: ${JSON.stringify(accountDesign)}`);

  try {
    await fs.writeFile(filePath, JSON.stringify(accountDesign, null, 2));
    res.status(200).json({ message: 'Account design saved successfully', design: accountDesign });
  } catch (err) {
    console.error('Error writing file:', err);
    res.status(500).json({ error: 'Failed to save account design' });
  }
});

// Endpoint to get the account design
app.get('/api/get-design', async (req, res) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    res.status(200).json(JSON.parse(data));
  } catch (err) {
    console.error('Error reading file:', err);
    // Return the empty template if reading fails
    res.status(200).json({});
  }
});

// Endpoint to get the test data
app.get('/api/get-test-data', async (req, res) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    res.status(200).json(JSON.parse(data));
  } catch (err) {
    console.error('Error reading test data file:', err);
    res.status(500).json({ error: 'Failed to read test data file' });
  }
});

// Define the GPT-4 API call function
async function callGpt4Api(accountDesign) {
  const prompt = `
    You are a skilled Solana blockchain developer. Based on the provided user and program account details, generate a sample Solana on-chain program code, test cases, and front-end code.

    Here are the details of the user accounts and program accounts:

    ${JSON.stringify(accountDesign, null, 2)}

    Please generate the following:
    1. Solana on-chain program code in Rust based on the provided user and program account details.
    2. Test cases in Rust to validate the functionality of the generated on-chain programs.
    3. Front-end code in JavaScript for interacting with the Solana programs using the @solana/web3.js library.

    Ensure to include:
    - Validation and error handling mechanisms as specified in the user and program account details.
    - Security requirements and audit logging features.
    - Any necessary integration points and performance metrics.

    Start by generating the Solana on-chain program code.
  `;

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
    const accountDesign = await fs.readFile(filePath, 'utf8');
    const gpt4Output = await callGpt4Api(JSON.parse(accountDesign));
    await fs.writeFile(gpt4OutputPath, gpt4Output, 'utf8');
    res.status(200).json({ gpt4Output });
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
    res.status500().json({ error: 'Failed to read GPT-4 output file' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend running at http://localhost:${port}`);
});
