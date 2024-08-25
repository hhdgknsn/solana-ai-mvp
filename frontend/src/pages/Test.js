import React from 'react';
import TestRunner from '../components/Test/TestRunner.js';
import Logs from '../components/Test/Logs.js';
import '../styles/Test.css';

const Test = () => {
  return (
    <div className="test-page">
      <h1>Test Your Application</h1>
      <TestRunner />
      <Logs />
    </div>
  );
};

export default Test;
