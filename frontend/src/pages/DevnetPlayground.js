import React, { useState, useEffect } from 'react';
import '../styles/index.css'
import '../styles/DevnetPlayground.css';

const DevnetPlayground = () => {
  const [gpt4Output, setGpt4Output] = useState('');
  const [mvpExample, setMvpExample] = useState(null);
  const [loading, setLoading] = useState(false);
  const [promptText, setPromptText] = useState('');

  const getGpt4Output = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/get-gpt4-output', {
        method: 'POST',
      });
      const data = await response.json();
      setGpt4Output(data.gpt4Output);
    } catch (error) {
      console.error('Error fetching GPT-4 output:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSavedOutput = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/get-saved-output');
      const data = await response.json();
      setGpt4Output(data.gpt4Output);
    } catch (error) {
      console.error('Error fetching saved GPT-4 output:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMvpExample = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/get-mvp-example');
      const data = await response.json();
      setMvpExample(data);
    } catch (error) {
      console.error('Error fetching MVP example:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPromptText = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/get-prompt-text');
      const data = await response.json();
      setPromptText(data.promptText);
    } catch (error) {
      console.error('Error fetching prompt text:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSavedOutput();
    getMvpExample();
    getPromptText();
  }, []);

  return (
    <div className="playground-container">
      <div className='pg-header'>
        <h1>Devnet Playground</h1>
        <p>This page injects the MVP specifications into an engineered prompt for input into OpenAI's GPT-4 model and outputs the response.</p>
      </div>
      
      <div className='pg-body'>
        {gpt4Output && (
          <div className="output-container">
            <div className='container-header'>
              <h2>GPT-4 Output:</h2>
            </div>
            <pre>{gpt4Output}</pre>
          </div>
        )}
      
        {mvpExample && (
          <div className="example-container">
            <div className='container-header'>
              <h2>MVP Example:</h2>
              <button onClick={getGpt4Output} disabled={loading}>
                {loading ? 'Loading...' : 'Generate Code'}
              </button>
            </div>
            <pre>{JSON.stringify(mvpExample, null, 2)}</pre>
          </div>
        )}
        
        {promptText && (
          <div className="prompt-container">
            <div className='container-header'>
              <h2>Engineered Prompt:</h2>
            </div>
            <pre>{promptText}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default DevnetPlayground;
