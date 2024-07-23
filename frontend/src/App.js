import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AccountDesign from './pages/AccountDesign/AccountDesign.js';
import DevnetPlayground from './pages/DevnetPlayground.js';
import '../src/styles/App.css';

const Navbar = () => {

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Account Design</Link></li>
        <li><Link to="/devnet-playground">Devnet Playground</Link></li>
      </ul>
    </nav>
  );
};

const App = () => {
  return (
      <Router>
        <div className="app-container">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<AccountDesign />} />
              <Route path="/devnet-playground" element={<DevnetPlayground />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
};

export default App;
