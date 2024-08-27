// index.js (or app.js)
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './src/routes/index.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use('/api', router);

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend running at http://localhost:${port}`);
});