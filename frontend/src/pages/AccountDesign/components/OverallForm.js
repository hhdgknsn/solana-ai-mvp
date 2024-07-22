import React, { useState } from 'react';
import GeneralForm from './GeneralForm.js';
import UserAccountForm from './UserAccountForm.js';
import ProgramAccountForm from './ProgramAccountForm.js';
import FunctionsForm from './FunctionsForm.js';
import SecurityForm from './SecurityForm.js';
import PermissionsForm from './PermissionsForm.js';
import IntegrationPointsForm from './IntegrationPointsForm.js';
import ValidationRulesForm from './ValidationRulesForm.js';
import TestCasesForm from './TestCasesForm.js';
import ErrorHandlingForm from './ErrorHandlingForm.js';
import TestEnvConfigForm from './TestEnvConfigForm.js';
import '../styles/OverallForm.css';

const OverallForm = () => {
  const [formData, setFormData] = useState({
    general: {
      project_name: "",
      mvp_description: "",
      user_description: ""
    },
    account_design: {
      user_accounts: [],
      program_accounts: []
    },
    functions: [],
    security: {
      measures: []
    },
    permissions: {
      roles: []
    },
    integration_points: {
      external_apis: []
    },
    validation_rules: {
      rules: []
    },
    test_cases: {
      cases: []
    },
    error_handling: {
      error_codes: []
    },
    test_env_config: {
      dependencies: [],
      setup_instructions: ""
    }
  });

  const handleFieldChange = (section, index, field, value) => {
    setFormData(prevState => {
      const sectionParts = section.split('.');
      let updatedSection = { ...prevState };

      if (sectionParts.length === 2) {
        updatedSection[sectionParts[0]][sectionParts[1]][index] = {
          ...updatedSection[sectionParts[0]][sectionParts[1]][index],
          [field]: value
        };
      } else {
        updatedSection[sectionParts[0]][index] = {
          ...updatedSection[sectionParts[0]][index],
          [field]: value
        };
      }

      return updatedSection;
    });
  };

  const addField = (section, newField) => {
    setFormData(prevState => {
      const sectionParts = section.split('.');
      let updatedSection = { ...prevState };

      if (sectionParts.length === 2) {
        updatedSection[sectionParts[0]][sectionParts[1]].push(newField);
      } else {
        updatedSection[sectionParts[0]].push(newField);
      }

      return updatedSection;
    });
  };

  const addNestedField = (section, index, field, newField) => {
    setFormData(prevState => {
      const sectionParts = section.split('.');
      let updatedSection = { ...prevState };

      if (sectionParts.length === 2) {
        updatedSection[sectionParts[0]][sectionParts[1]][index][field].push(newField);
      } else {
        updatedSection[sectionParts[0]][index][field].push(newField);
      }

      return updatedSection;
    });
  };

  return (
    <div className="overall-form">
      <div>
        <h2>General Information</h2>
        <GeneralForm
          general={formData.general}
          handleFieldChange={(field, value) => handleFieldChange('general', field, value)}
        />
      </div>
      <div>
        <h2>User Accounts</h2>
        <UserAccountForm
          accounts={formData.account_design.user_accounts}
          handleFieldChange={handleFieldChange}
          addField={addField}
          addNestedField={addNestedField}
        />
      </div>
      <div>
        <h2>Program Accounts</h2>
        <ProgramAccountForm
          programAccounts={formData.account_design.program_accounts}
          handleFieldChange={handleFieldChange}
          addField={addField}
          addNestedField={addNestedField}
        />
      </div>
      {/* Add other form sections here similarly */}
    </div>
  );
};

export default OverallForm;
