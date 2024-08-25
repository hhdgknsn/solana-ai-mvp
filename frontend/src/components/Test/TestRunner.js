import React, { useState } from 'react';

const TestRunner = () => {
  const [testStatus, setTestStatus] = useState(null);
  const [isRunningTests, setIsRunningTests] = useState(false);

  const handleRunTests = () => {
    setIsRunningTests(true);
    setTestStatus('Running tests...');

    // Simulate running tests
    setTimeout(() => {
      setTestStatus('All tests passed!');
      setIsRunningTests(false);
    }, 3000); // Simulate a delay for running tests
  };

  return (
    <div className="test-runner">
      <h2>Test Runner</h2>
      <button onClick={handleRunTests} disabled={isRunningTests}>
        {isRunningTests ? 'Running...' : 'Run Tests'}
      </button>
      {testStatus && <p>{testStatus}</p>}
    </div>
  );
};

export default TestRunner;
