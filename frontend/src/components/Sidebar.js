import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaPencilAlt, FaCode, FaRocket, FaVial } from 'react-icons/fa';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink exact to="/design" activeClassName="active-link">
        <FaPencilAlt /> 
      </NavLink>
      <NavLink to="/edit" activeClassName="active-link">
        <FaCode /> 
      </NavLink>
      <NavLink to="/deploy" activeClassName="active-link">
        <FaRocket /> 
      </NavLink>
      <NavLink to="/test" activeClassName="active-link">
        <FaVial /> 
      </NavLink>
    </div>
  );
};

export default Sidebar;
