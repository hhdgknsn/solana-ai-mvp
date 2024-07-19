import axios from 'axios';

const API_URL = 'http://localhost:8000';

// Function to generate text based on a prompt
export const generateText = async (prompt) => {
  try {
    const response = await axios.post(`${API_URL}/api/generate`, { prompt });
    return response.data.generated_text;
  } catch (error) {
    console.error('Error generating text:', error);
    throw error;
  }
};

// Function to save account design
export const saveAccountDesign = async (design) => {
  try {
    const response = await axios.post(`${API_URL}/api/save`, design);
    return response.data.message;
  } catch (error) {
    console.error('Error saving account design:', error);
    throw error;
  }
};
