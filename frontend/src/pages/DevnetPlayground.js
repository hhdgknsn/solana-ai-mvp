import React, { useState, useEffect } from 'react';
import '../styles/index.css'
import '../styles/DevnetPlayground.css';

const DevnetPlayground = () => {
  const [gpt4Output, setGpt4Output] = useState('');
  const [mvpExample, setMvpExample] = useState(null);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    getSavedOutput();
    getMvpExample();
  }, []);

  return (
    <div className="playground-container">
      <div className='pg-header'>
        <h1>Devnet Playground</h1>
        <p>Here you can test your Rust code and its test cases on the Solana Devnet.</p>
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
      </div>

    </div>
  );
};

export default DevnetPlayground;
