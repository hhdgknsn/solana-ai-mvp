import React, { useState, useEffect } from 'react';


// Form imports 
import GeneralForm from './GeneralForm.js';
import UserAccountsForm from './UserAccountsForm.js';
import ProgramAccountsForm from './ProgramAccountsForm.js';
import FunctionsForm from './FunctionsForm.js';



// Styles
import '../styles/OverallForm.css';

const OverallForm = ({ formData, handleFieldChange, handleSubmit, addField, addNestedField, handleKeyPress }) => {
  const [activeForm, setActiveForm] = useState('General');

  const forms = {
    General: (
      <GeneralForm
        general={formData.general}
        handleFieldChange={handleFieldChange}
        handleSubmit={handleSubmit}
        handleKeyPress={handleKeyPress}
      />
    ),
    "User Accounts": (
      <UserAccountsForm
        user_accounts={formData.account_design.user_accounts}
        handleFieldChange={handleFieldChange}
        handleSubmit={handleSubmit}
        handleKeyPress={handleKeyPress}
      />
    ),
    "Program Accounts": (
      <ProgramAccountsForm
        program_accounts={formData.account_design.program_accounts}
        handleFieldChange={handleFieldChange}
        handleSubmit={handleSubmit}
        handleKeyPress={handleKeyPress}
      />
    ),
    "Functions": (
      <FunctionsForm
        functions={formData.functions}
        handleFieldChange={handleFieldChange}
        handleSubmit={handleSubmit}
        handleKeyPress={handleKeyPress}
      />
    ),
    
  };

  return (
    <div className="overall-form-container">
      <div className="sidebar">
        <ul>
          {Object.keys(forms).map(form => (
            <li key={form} onClick={() => setActiveForm(form)}>
              {form}
            </li>
          ))}
        </ul>
      </div>
      <div className="form-content">
        {forms[activeForm]}
      </div>
    </div>
  );
};

export default OverallForm;
