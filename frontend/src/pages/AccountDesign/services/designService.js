import axios from 'axios';

const getDesign = async () => {
  try {
    const response = await axios.get('/api/get-design');
    return response.data;
  } catch (error) {
    console.error('Error fetching design:', error);
    throw error;
  }
};

const saveDesign = async (design) => {
  try {
    const response = await axios.post('/api/save', design);
    return response.data;
  } catch (error) {
    console.error('Error saving design:', error);
    throw error;
  }
};

const generateOverview = async (design) => {
  try {
    const response = await axios.post('/api/generate', design);
    return response.data;
  } catch (error) {
    console.error('Error generating overview:', error);
    throw error;
  }
};

export { getDesign, saveDesign, generateOverview };
