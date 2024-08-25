import React, { useState } from 'react';

const Logs = () => {
  const [logs, setLogs] = useState([
    "Initializing deployment...",
    "Deploying to Devnet...",
    "Deployment successful!",
    "Running tests...",
    "All tests passed!"
  ]);

  return (
    <div className="logs">
      <h2>Logs</h2>
      <pre>
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </pre>
    </div>
  );
};

export default Logs;
