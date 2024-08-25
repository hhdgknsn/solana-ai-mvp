import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
import './styles/Index.css';
import App from './App.js';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <React.StrictMode>
    <BrowserRouter>  {/* Wrap the app with BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
