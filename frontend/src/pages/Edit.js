import React, { useState } from 'react';
import FileExplorer from '../components/Edit/FileExplorer.js';
import CodeEditor from '../components/Edit/CodeEditor.js';
import Terminal from '../components/Edit/Terminal.js';
import '../styles/Edit.css';
import axios from 'axios';

const Edit = () => {
  const [files, setFiles] = useState([]);
  const [selectedFileContent, setSelectedFileContent] = useState('');

  const testEndpoint = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/test');
      console.log(response.data); // Should log: { message: "Test endpoint is working!" }
    } catch (error) {
      console.error('Error hitting test endpoint:', error);
    }
  };


  const handleGenerateCode = async () => {
    try {
      // Trigger the backend code generation
      const response = await axios.post('http://localhost:8000/api/gen-code');
      
      if (response.status === 200) {
        // After the files are generated, fetch the list of files
        fetchProjectFiles();
      }
    } catch (error) {
      console.error('Error generating code:', error);
    }
  };


  const fetchProjectFiles = async () => {
    console.log("inside fetch project files function");
    try {
      const response = await axios.get('http://localhost:8000/api/project/files');
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching project files:', error);
    }
  };

  const handleFileClick = async (fileName) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/get-file/src/${fileName}`);
      setSelectedFileContent(response.data);
    } catch (error) {
      console.error('Error fetching file content:', error);
    }
  };
  

  return (
    <div className="edit-page">
      <div className="side-section">
      <button onClick={handleGenerateCode} className="generate-button">
          Generate Project
        </button>
        <FileExplorer files={files} onFileClick={handleFileClick} />
      </div>
      <div className="editor-section">
        <CodeEditor fileContent={selectedFileContent} setFileContent={setSelectedFileContent} />
        <Terminal />
      </div>
    </div>
  );
};

export default Edit;
