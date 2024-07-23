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

const OverallForm = ({ formData, handleFieldChange, handleSubmit, addField, addNestedField }) => {
  const [activeForm, setActiveForm] = useState('General');

  const handleKeyPress = (section, index, field, value) => (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(section, index, field, value);
    }
  };

  const forms = {
    General: (
      <GeneralForm
        general={formData.general}
        handleFieldChange={handleFieldChange}
        handleSubmit={handleSubmit}
        handleKeyPress={handleKeyPress}
      />
    ),
    UserAccount: (
      <UserAccountForm
        accounts={formData.account_design?.user_accounts || []}
        handleFieldChange={handleFieldChange}
        addField={addField}
        addNestedField={addNestedField}
        handleKeyPress={handleKeyPress}
      />
    ),
    ProgramAccount: (
      <ProgramAccountForm
        programAccounts={formData.account_design?.program_accounts || []}
        handleFieldChange={handleFieldChange}
        addField={addField}
        addNestedField={addNestedField}
        handleKeyPress={handleKeyPress}
      />
    ),
    Functions: (
      <FunctionsForm
        functions={formData.functions}
        handleNestedFieldChange={handleFieldChange}
        addNestedField={addField}
        handleKeyPress={handleKeyPress}
      />
    ),
    Security: (
      <SecurityForm
        security={formData.security}
        handleFieldChange={handleFieldChange}
        handleKeyPress={handleKeyPress}
      />
    ),
    Permissions: (
      <PermissionsForm
        permissions={formData.permissions}
        handleNestedFieldChange={handleFieldChange}
        addNestedField={addField}
        handleKeyPress={handleKeyPress}
      />
    ),
    IntegrationPoints: (
      <IntegrationPointsForm
        integration_points={formData.integration_points}
        handleNestedFieldChange={handleFieldChange}
        addNestedField={addField}
        handleKeyPress={handleKeyPress}
      />
    ),
    ValidationRules: (
      <ValidationRulesForm
        validation_rules={formData.validation_rules}
        handleNestedFieldChange={handleFieldChange}
        addNestedField={addField}
        handleKeyPress={handleKeyPress}
      />
    ),
    TestCases: (
      <TestCasesForm
        test_cases={formData.test_cases}
        handleNestedFieldChange={handleFieldChange}
        addNestedField={addField}
        handleKeyPress={handleKeyPress}
      />
    ),
    ErrorHandling: (
      <ErrorHandlingForm
        error_handling={formData.error_handling}
        handleNestedFieldChange={handleFieldChange}
        addNestedField={addField}
        handleKeyPress={handleKeyPress}
      />
    ),
    TestEnvConfig: (
      <TestEnvConfigForm
        test_env_config={formData.test_env_config}
        handleFieldChange={handleFieldChange}
        handleKeyPress={handleKeyPress}
      />
    )
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
