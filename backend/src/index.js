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

const filePath = path.join(__dirname, 'account_design.json');
const testFilePath = path.join(__dirname, 'account_design_test.json');
const gpt4OutputPath = path.join(__dirname, 'gpt4_output.json');

// Define the updated empty template structure
const emptyTemplate = {
  "user_accounts": [
    {
      "account_type": "", 
      "public_key": "",
      "private_key": "", 
      "owner": "", 
      "balance": "",
      "creation_timestamp": "",
      "nonce": "",
      "name": "",
      "metadata": "",
      "email": "",
      "permissions": "",
      "associated_programs": "",
      "transaction_history": "",
      "settings": "",
      "status": "",
      "expiration_date": "",
      "profile_info": "",
      "relationships": [
        {
          "related_account_id": "",
          "relationship_type": "",
          "details": ""
        }
      ],
      "security": {
        "requirements": "",
        "audit_logging": ""
      },
      "validation_rules": [
        {
          "field_name": "",
          "validation_type": "",
          "constraints": ""
        }
      ],
      "events": [
        {
          "event_type": "",
          "event_data": ""
        }
      ],
      "error_handling": {
        "error_codes": [
          {
            "code": 0,
            "message": ""
          }
        ]
      },
      "testing": {
        "test_cases": [
          {
            "test_case_id": "",
            "description": "",
            "expected_result": ""
          }
        ]
      }
    }
  ],
  "program_accounts": [
    {
      "account_type": "ProgramAccount",
      "program_type": "",
      "public_key": "",
      "private_key": "", // Optional, similar to user accounts if needed
      "owner": "",
      "name": "",
      "code_hash": "",
      "creation_timestamp": "",
      "version": "",
      "metadata": "",
      "status": "",
      "associated_users": [],
      "instructions": [
        {
          "instruction_name": "",
          "parameters": [
            {
              "name": "",
              "type": "",
              "required": true
            }
          ]
        }
      ],
      "permissions": "",
      "settings": "",
      "relationships": [
        {
          "related_account_id": "",
          "relationship_type": "",
          "details": ""
        }
      ],
      "security": {
        "requirements": "",
        "audit_logging": ""
      },
      "performance_metrics": [
        {
          "metric": "",
          "description": ""
        }
      ],
      "integration_points": [
        {
          "type": "",
          "description": ""
        }
      ],
      "error_handling": {
        "error_codes": [
          {
            "code": 0,
            "message": ""
          }
        ]
      },
      "testing": {
        "test_cases": [
          {
            "test_case_id": "",
            "description": "",
            "expected_result": ""
          }
        ]
      }
    }
  ]
};

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
    await fs.writeFile(file, JSON.stringify(emptyTemplate, null, 2));
    console.log(`File ${file} created with empty template.`);
  }
}

// Initialize function to ensure directory and file existence
async function initialize() {
  await ensureDirectoryExists(path.dirname(filePath));
  await ensureFileExists(filePath);
  await ensureFileExists(testFilePath);
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
    res.status(200).json(emptyTemplate);
  }
});

// Define the GPT-4 API call function
async function callGpt4Api(accountDesign) {
  const prompt = `
    You are a skilled Solana blockchain developer. I need you to help me generate Solana programs, test cases, and front-end code based on the provided user and program account details and additional project requirements.

    Here are the details of the user accounts and program accounts:

    ${JSON.stringify(accountDesign, null, 2)}

    Please generate the following:
    1. Solana on-chain program code based on the provided user and program account details.
    2. Test cases to validate the functionality of the generated on-chain programs.
    3. Front-end code for interacting with the Solana programs.

    Additionally, ensure to include:
    - Validation and error handling mechanisms as specified in the user and program account details.
    - Security requirements and audit logging features.
    - Any necessary integration points and performance metrics.

    Example output should include:
    1. Rust code for Solana programs.
    2. JavaScript/TypeScript code for deploying and interacting with the Solana programs.
    3. Detailed test cases in a suitable testing framework.
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
          'Authorization': `Bearer ${"sk-None-cQW10tl3zYKq3X7nVGKQT3BlbkFJsjsCpLduooVDm7x2CXGV"}`,
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
    const accountDesign = await fs.readFile(testFilePath, 'utf8');
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
    res.status(500).json({ error: 'Failed to read GPT-4 output file' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend running at http://localhost:${port}`);
});
