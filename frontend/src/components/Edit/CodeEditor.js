import React from 'react';
import MonacoEditor from 'react-monaco-editor';

const CodeEditor = ({ fileContent, setFileContent }) => (
  <div className="code-editor-container">
    <MonacoEditor
      width="100%"
      height="calc(100vh - 200px)"  // Adjust to ensure terminal space is accounted for
      language="rust"
      theme="vs-dark"
      value={fileContent}
      onChange={setFileContent}
      options={{ selectOnLineNumbers: true }}
    />
  </div>
);

export default CodeEditor;
