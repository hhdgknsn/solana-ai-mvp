const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.post('/api/generate', async (req, res) => {
  const prompt = req.body.prompt;
  console.log(`Received prompt: ${prompt}`);

  try {
    const response = await fetch('http://ai_model:5000/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate code' });
  }
});

app.post('/api/save', async (req, res) => {
  const accountDesign = req.body;
  console.log(`Received account design: ${JSON.stringify(accountDesign)}`);

  const filePath = path.join(__dirname, 'account_design.json');

  fs.writeFile(filePath, JSON.stringify(accountDesign, null, 2), (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return res.status(500).json({ error: 'Failed to save account design' });
    }
    res.status(200).json({ message: 'Account design saved successfully' });
  });
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
