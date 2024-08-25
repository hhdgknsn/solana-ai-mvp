import React from 'react';
import General from './General.js'; 
import Roles from './Roles.js';     
import Accounts from './Accounts.js'; 
import Instructions from './Instructions.js'; 
import ErrorHandling from './ErrorHandling.js'; 
import Security from './Security.js'; 
import Integrations from './Integrations.js'; 
import '../../styles/Design.css';

const OverallForm = ({ formData, handleFieldChange, handleSubmit, addField, addNestedField, handleKeyPress }) => {
  return (
    <div className="form-content">
      <div className="form-section">
        <h2>General</h2>
        <General
          general={formData.general}
          handleFieldChange={handleFieldChange}
          handleSubmit={handleSubmit}
          handleKeyPress={handleKeyPress}
        />
      </div>

      <div className="form-section">
        <h2>Roles</h2>
        <Roles
          roles={formData.roles}
          handleFieldChange={handleFieldChange}
          handleSubmit={handleSubmit}
          handleKeyPress={handleKeyPress}
          addField={addField}
        />
      </div>

      <div className="form-section">
        <h2>Accounts</h2>
        <Accounts
          accountsData={formData.accountDesign} // Updated prop name, assuming the prop structure matches the new combined Accounts component
          handleFieldChange={handleFieldChange}
          handleSubmit={handleSubmit}
          handleKeyPress={handleKeyPress}
          addField={addField}
          addNestedField={addNestedField}
        />
      </div>

      <div className="form-section">
        <h2>Instructions</h2>
        <Instructions
          instructions={formData.instructions}
          handleFieldChange={handleFieldChange}
          handleSubmit={handleSubmit}
          handleKeyPress={handleKeyPress}
          addField={addField}
          addNestedField={addNestedField}
        />
      </div>

      <div className="form-section">
        <h2>Error Handling</h2>
        <ErrorHandling
          errorHandling={formData.errorHandling}
          handleFieldChange={handleFieldChange}
          handleSubmit={handleSubmit}
          handleKeyPress={handleKeyPress}
        />
      </div>

      <div className="form-section">
        <h2>Security Requirements</h2>
        <Security
          securityRequirements={formData.securityRequirements}
          handleFieldChange={handleFieldChange}
          handleSubmit={handleSubmit}
          handleKeyPress={handleKeyPress}
        />
      </div>

      <div className="form-section">
        <h2>Integration Points</h2>
        <Integrations
          integrationPoints={formData.integrationPoints}
          handleFieldChange={handleFieldChange}
          handleSubmit={handleSubmit}
          handleKeyPress={handleKeyPress}
          addField={addField}
          addNestedField={addNestedField}
        />
      </div>
    </div>
  );
};

export default OverallForm;
