import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AccountDesign from './pages/AccountDesign/AccountDesign.js';
import DevnetPlayground from './pages/DevnetPlayground.js';
import FrontendPlayground from './pages/FrontendPlayground.js';
import '../src/styles/App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <ul className="nav-links">
            <li><Link to="/">Account Design</Link></li>
            <li><Link to="/devnet-playground">Devnet Playground</Link></li>
            <li><Link to="/frontend-playground">Frontend Playground</Link></li>
          </ul>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<AccountDesign />} />
            <Route path="/devnet-playground" element={<DevnetPlayground />} />
            <Route path="/frontend-playground" element={<FrontendPlayground />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
