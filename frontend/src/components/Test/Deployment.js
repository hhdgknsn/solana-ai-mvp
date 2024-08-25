import React, { useState } from 'react';

const Deployment = () => {
  const [deploymentStatus, setDeploymentStatus] = useState(null);
  const [isDeploying, setIsDeploying] = useState(false);

  const handleDeploy = () => {
    setIsDeploying(true);
    setDeploymentStatus('Deploying...');

    // Simulate deployment process
    setTimeout(() => {
      setDeploymentStatus('Deployment Successful');
      setIsDeploying(false);
    }, 3000); // 3-second delay to simulate deployment
  };

  return (
    <div className="deployment-manager">
      <h2>Deployment Manager</h2>
      <button onClick={handleDeploy} disabled={isDeploying}>
        {isDeploying ? 'Deploying...' : 'Deploy'}
      </button>
      {deploymentStatus && <p>{deploymentStatus}</p>}
    </div>
  );
};

export default Deployment;
