import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { defaultDesign } from './schema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

const filePath = path.join(__dirname, 'account_design.json');

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
    console.log(`File ${file} does not exist, creating with default design...`);
    await fs.writeFile(file, JSON.stringify(defaultDesign, null, 2));
    console.log(`File ${file} created with default design.`);
  }
}

// Ensure directory and file exist
async function initialize() {
  await ensureDirectoryExists(path.dirname(filePath));
  await ensureFileExists(filePath);
}

initialize().catch(err => {
  console.error('Initialization error:', err);
});

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

app.get('/api/get-design', async (req, res) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    res.status(200).json(JSON.parse(data));
  } catch (err) {
    console.error('Error reading file:', err);
    // Return the default design instead of throwing an error
    res.status(200).json(defaultDesign);
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend running at http://localhost:${port}`);
});
