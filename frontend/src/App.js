import React from 'react';
import Sidebar from './components/Sidebar.js';
import Wallet from './components/Wallet.js';
import AppRoutes from './Routes.js';
import './styles/App.css';

const App = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <div className="content-area">
          <AppRoutes />
        </div>
        <Wallet />
      </div>
    </div>
  );
};

export default App;
