import React from 'react';
import Deployment from '../components/Test/Deployment.js';
import Logs from '../components/Test/Logs.js';
import '../styles/Deploy.css';

const Deploy = () => {
  return (
    <div className="deploy-page">
      <h1>Build & Deploy Your Application</h1>
      <Deployment />
      <Logs />
    </div>
  );
};

export default Deploy;
