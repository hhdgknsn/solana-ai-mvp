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

const testData = {
  "user_accounts": [
    {
      "account_type": "User",
      "public_key": "A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6",
      "private_key": "1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6Z7",
      "owner": "UserOwnerExample",
      "balance": "10000",
      "creation_timestamp": "2023-07-19T12:34:56Z",
      "nonce": "123456",
      "name": "Alice",
      "metadata": "Example metadata",
      "email": "alice@example.com",
      "permissions": "ReadWrite",
      "associated_programs": "Program1, Program2",
      "transaction_history": "Tx1, Tx2, Tx3",
      "settings": "User settings",
      "status": "Active",
      "expiration_date": "2024-07-19T12:34:56Z",
      "profile_info": "Profile info for Alice",
      "relationships": [
        {
          "related_account_id": "RelatedAccountID1",
          "relationship_type": "Friend",
          "details": "Details about relationship"
        }
      ],
      "security": {
        "requirements": "Password, 2FA",
        "audit_logging": "Enabled"
      },
      "validation_rules": [
        {
          "field_name": "email",
          "validation_type": "regex",
          "constraints": "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"
        }
      ],
      "events": [
        {
          "event_type": "Login",
          "event_data": "User logged in"
        }
      ],
      "error_handling": {
        "error_codes": [
          {
            "code": 101,
            "message": "Invalid email format"
          }
        ]
      },
      "testing": {
        "test_cases": [
          {
            "test_case_id": "TC1",
            "description": "Test email validation",
            "expected_result": "Invalid email error"
          }
        ]
      }
    }
  ],
  "program_accounts": [
    {
      "account_type": "ProgramAccount",
      "program_type": "Lending",
      "public_key": "B1C2D3E4F5G6H7I8J9K0L1M2N3O4P5Q6R7S8T9U0V1W2X3Y4Z5",
      "private_key": "2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6Z7A",
      "owner": "ProgramOwnerExample",
      "name": "Lending Program",
      "code_hash": "a1b2c3d4e5f6g7h8i9j0",
      "creation_timestamp": "2023-07-19T12:34:56Z",
      "version": "1.0.0",
      "metadata": "Lending program metadata",
      "status": "Deployed",
      "associated_users": ["User1", "User2"],
      "instructions": [
        {
          "instruction_name": "Deposit",
          "parameters": [
            {
              "name": "amount",
              "type": "u64",
              "required": true
            }
          ]
        },
        {
          "instruction_name": "Withdraw",
          "parameters": [
            {
              "name": "amount",
              "type": "u64",
              "required": true
            }
          ]
        }
      ],
      "permissions": "ReadWrite",
      "settings": "Program settings",
      "relationships": [
        {
          "related_account_id": "RelatedProgramID1",
          "relationship_type": "Dependency",
          "details": "Details about program relationship"
        }
      ],
      "security": {
        "requirements": "Secure communication",
        "audit_logging": "Enabled"
      },
      "performance_metrics": [
        {
          "metric": "TransactionThroughput",
          "description": "Number of transactions per second"
        }
      ],
      "integration_points": [
        {
          "type": "OracleService",
          "description": "Integration with price oracle for dynamic interest rates"
        }
      ],
      "error_handling": {
        "error_codes": [
          {
            "code": 201,
            "message": "Insufficient funds"
          }
        ]
      },
      "testing": {
        "test_cases": [
          {
            "test_case_id": "TC2",
            "description": "Test deposit function",
            "expected_result": "Deposit successful"
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

// Endpoint to get the test data
app.get('/api/get-test-data', (req, res) => {
  res.status(200).json(testData);
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
