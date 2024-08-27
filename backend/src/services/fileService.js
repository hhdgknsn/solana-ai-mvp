import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to load and validate user input from a saved JSON file
export async function loadUserInput(fileName = 'mvp-example2.json') {
  const filePath = path.join(__dirname, '../../mvp-design', fileName);
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading user input:', error);
    throw error;
  }
}

// Function to save generated files based on a template
export async function saveGeneratedFiles(generatedCode, structureTemplate) {
  try {
    const basePath = path.join(__dirname, '../../project');
    for (const [fileName, fileContent] of Object.entries(generatedCode)) {
      const filePath = path.join(basePath, structureTemplate[fileName]);
      await fs.writeFile(filePath, fileContent, 'utf8');
    }
    console.log('Files saved successfully');
  } catch (error) {
    console.error('Error saving generated files:', error);
    throw error;
  }
}

// Function to update the user's saved input with new data
export async function updateUserInput(userInput, updates) {
  Object.assign(userInput, updates);
  const filePath = path.join(__dirname, '../../mvp-design', 'mvp-example2.json');
  await fs.writeFile(filePath, JSON.stringify(userInput, null, 2), 'utf8');
}
