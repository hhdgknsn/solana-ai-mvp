import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const apiKey = "sk-None-cQW10tl3zYKq3X7nVGKQT3BlbkFJsjsCpLduooVDm7x2CXGV";

if (!apiKey) {
    throw new Error("OpenAI API key is not set in environment variables");
}

async function interactWithGpt4Chat(messages, model = 'gpt-4') {
    const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
            model: model,
            messages: messages
        },
        {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        }
    );

    return response.data.choices[0].message.content.trim();
}

const prompt = "Enter your prompt: ";
process.stdout.write(prompt);
process.stdin.on('data', async (data) => {
    const userPrompt = data.toString().trim();
    try {
        const messages = [{ role: 'user', content: userPrompt }];
        const gpt4Response = await interactWithGpt4Chat(messages, 'gpt-4');
        console.log("GPT-4 Response:", gpt4Response);
    } catch (error) {
        console.error("Error interacting with GPT-4:", error.response ? error.response.data : error.message);
    }
});
