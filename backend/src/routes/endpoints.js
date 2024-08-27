// src/routes/index.js
import express from 'express';
import { loadUserInput, saveGeneratedFiles, updateUserInput } from '../services/fileService';
import { generateCodeBatch, buildPrompt } from '../services/aiService';
import { createVectorStore, uploadFilesToVectorStore, updateAssistantWithVectorStore, searchFiles } from '../services/fileSearchService';

const router = express.Router();

router.post('/generate-and-save-code', async (req, res) => {
  try {
    const userInput = await loadUserInput();
    const generatedFiles = await generateCodeBatch(userInput);

    const structureTemplate = JSON.parse(await fs.readFile(path.join(__dirname, '../../schemas', 'project-template.json'), 'utf8'));
    await saveGeneratedFiles(generatedFiles, structureTemplate);

    res.status(200).json({ message: 'Code generated and saved successfully' });
  } catch (error) {
    console.error('Error in generate-and-save-code:', error);
    res.status(500).json({ error: 'Failed to generate and save code' });
  }
});

router.post('/update-input', async (req, res) => {
  try {
    const updates = req.body;
    const userInput = await loadUserInput();
    await updateUserInput(userInput, updates);
    res.status(200).json({ message: 'User input updated successfully' });
  } catch (error) {
    console.error('Error in update-input:', error);
    res.status(500).json({ error: 'Failed to update user input' });
  }
});

router.get('/retrieve-files', async (req, res) => {
  try {
    const projectSrcPath = path.join(__dirname, '../../project', 'src');
    const files = await fs.readdir(projectSrcPath, { withFileTypes: true });
    const fileList = files.filter(file => file.isFile()).map(file => file.name);
    res.status(200).json(fileList);
  } catch (error) {
    console.error('Error retrieving files:', error);
    res.status(500).json({ error: 'Failed to retrieve files' });
  }
});

router.get('/get-prompt-text', async (req, res) => {
  try {
    const userInput = await loadUserInput();
    const prompt = buildPrompt(userInput);
    res.status(200).json({ promptText: prompt });
  } catch (error) {
    console.error('Error generating prompt text:', error);
    res.status(500).json({ error: 'Failed to generate prompt text' });
  }
});

router.get('/get-file/src/:fileName', async (req, res) => {
  const { fileName } = req.params;
  try {
    const filePath = path.join(__dirname, '../../project', 'src', fileName);
    const content = await fs.readFile(filePath, 'utf8');
    res.status(200).send(content);
  } catch (error) {
    console.error(`Failed to read file content for ${fileName}:`, error);
    res.status(500).json({ error: 'Failed to read file content' });
  }
});

router.get('/get-json/:directory/:fileName', async (req, res) => {
  const { directory, fileName } = req.params;
  let filePath;

  try {
    if (directory === 'current') {
      filePath = path.join(__dirname, `../../${fileName}.json`);
    } else {
      filePath = path.join(__dirname, `../../${directory}/${fileName}.json`);
    }

    console.log(`Fetching file from: ${filePath}`);

    await fs.access(filePath);
    const data = await fs.readFile(filePath, 'utf8');
    
    if (!data) {
      console.warn(`File is empty: ${filePath}`);
      return res.status(204).json({ message: `${fileName} is empty in ${directory}` });
    }

    const jsonData = JSON.parse(data);
    res.status(200).json(jsonData);
  } catch (err) {
    console.error(`Error reading ${fileName} from ${directory}:`, err);
    res.status(500).json({ error: `Failed to read ${fileName} from ${directory}` });
  }
});

router.post('/file-search/create-vector-store', async (req, res) => {
  try {
    const { name } = req.body;
    const vectorStoreId = await createVectorStore(name);
    res.status(200).json({ vectorStoreId });
  } catch (error) {
    console.error('Error creating vector store:', error);
    res.status(500).json({ error: 'Failed to create vector store' });
  }
});

router.post('/file-search/upload', async (req, res) => {
  try {
    const { vectorStoreId, filePaths } = req.body;
    const fileBatch = await uploadFilesToVectorStore(vectorStoreId, filePaths);
    res.status(200).json({ fileBatch });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ error: 'Failed to upload files' });
  }
});

router.post('/file-search/update-assistant', async (req, res) => {
  try {
    const { assistantId, vectorStoreId } = req.body;
    await updateAssistantWithVectorStore(assistantId, vectorStoreId);
    res.status(200).json({ message: 'Assistant updated successfully' });
  } catch (error) {
    console.error('Error updating assistant:', error);
    res.status(500).json({ error: 'Failed to update assistant' });
  }
});

router.post('/file-search/query', async (req, res) => {
  try {
    const { threadId, assistantId, query } = req.body;
    const response = await searchFiles(threadId, assistantId, query);
    res.status(200).json(response);
  } catch (error) {
    console.error('Error querying files:', error);
    res.status(500).json({ error: 'Failed to query files' });
  }
});

export default router;
