import React, { useState } from 'react';

const Terminal = () => {
  const [output, setOutput] = useState('');

  const handleCommand = async (command) => {
    const response = await fetch('/api/run-command', {
      method: 'POST',
      body: JSON.stringify({ command }),
    });
    const result = await response.text();
    setOutput((prev) => prev + `\n${result}`);
  };

  return (
    <div className="terminal-container">
      <div className="terminal-output">
        <pre>{output}</pre>
      </div>
      <input
        type="text"
        className="terminal-input"
        placeholder="Enter command..."
        onKeyDown={(e) => e.key === 'Enter' && handleCommand(e.target.value)}
      />
    </div>
  );
};

export default Terminal;
