import React, { useState, useEffect } from 'react';

const ProgramAccountForm = ({
  programAccounts,
  handleFieldChange,
  addField,
  addNestedField,
}) => {
  const [expandedFormIndex, setExpandedFormIndex] = useState(null);

  const toggleFormVisibility = (index) => {
    setExpandedFormIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="section">
      <div className="section-header">
        <button className='add-button' type="button" onClick={() => addField('account_design.program_accounts', {
          account_type: "ProgramAccount",
          program_type: "",
          public_key: "",
          private_key: "",
          owner: "",
          name: "",
          code_hash: "",
          creation_timestamp: "",
          version: "",
          metadata: "",
          status: "",
          associated_users: [],
          instructions: [{ instruction_name: "", parameters: [{ name: "", type: "", required: true }] }],
          permissions: "",
          settings: "",
          relationships: [],
          security: { requirements: "", audit_logging: "" },
          performance_metrics: [],
          integration_points: [],
          error_handling: { error_codes: [] },
          testing: { test_cases: [] }
        })}>
          Add Program Account
        </button>
      </div>
      <div className="section-content">
        <div className="account-buttons">
          {programAccounts.map((account, accountIndex) => (
            <button 
              key={accountIndex} 
              type="button" 
              className="account-button"
              onClick={() => toggleFormVisibility(accountIndex)}
            >
              {expandedFormIndex === accountIndex ? `Hide Program Account ${accountIndex + 1}` : `Edit Program Account ${accountIndex + 1}`}
            </button>
          ))}
        </div>
        {programAccounts.map((account, accountIndex) => (
          expandedFormIndex === accountIndex && (
            <div key={accountIndex} className='account-form-container'>
              <div className='account-form'>
                <h3>Program Account {accountIndex + 1}</h3>
                <select
                  value={account.account_type}
                  onChange={(e) => handleFieldChange(accountIndex, 'account_type', e.target.value)}
                >
                  <option value="ProgramAccount">ProgramAccount</option>
                </select>
                <input
                  type="text"
                  value={account.program_type || ""}
                  onChange={(e) => handleFieldChange(accountIndex, 'program_type', e.target.value)}
                  placeholder="Program Type"
                />
                <input
                  type="text"
                  value={account.public_key || ""}
                  onChange={(e) => handleFieldChange(accountIndex, 'public_key', e.target.value)}
                  placeholder="Public Key"
                />
                <input
                  type="text"
                  value={account.private_key || ""}
                  onChange={(e) => handleFieldChange(accountIndex, 'private_key', e.target.value)}
                  placeholder="Private Key"
                />
                <input
                  type="text"
                  value={account.owner || ""}
                  onChange={(e) => handleFieldChange(accountIndex, 'owner', e.target.value)}
                  placeholder="Owner"
                />
                <input
                  type="text"
                  value={account.name || ""}
                  onChange={(e) => handleFieldChange(accountIndex, 'name', e.target.value)}
                  placeholder="Name"
                />
                <input
                  type="text"
                  value={account.code_hash || ""}
                  onChange={(e) => handleFieldChange(accountIndex, 'code_hash', e.target.value)}
                  placeholder="Code Hash"
                />
                <input
                  type="text"
                  value={account.creation_timestamp || ""}
                  onChange={(e) => handleFieldChange(accountIndex, 'creation_timestamp', e.target.value)}
                  placeholder="Creation Timestamp"
                />
                <input
                  type="text"
                  value={account.version || ""}
                  onChange={(e) => handleFieldChange(accountIndex, 'version', e.target.value)}
                  placeholder="Version"
                />
                <input
                  type="text"
                  value={account.metadata || ""}
                  onChange={(e) => handleFieldChange(accountIndex, 'metadata', e.target.value)}
                  placeholder="Metadata"
                />
                <input
                  type="text"
                  value={account.status || ""}
                  onChange={(e) => handleFieldChange(accountIndex, 'status', e.target.value)}
                  placeholder="Status"
                />
                <h3>Associated Users</h3>
                {account.associated_users.map((user, userIndex) => (
                  <input
                    key={userIndex}
                    type="text"
                    value={user || ""}
                    onChange={(e) => handleNestedFieldChange(accountIndex, 'associated_users', userIndex, e.target.value)}
                    placeholder="Associated User"
                  />
                ))}
                <button type="button" onClick={() => addNestedField(accountIndex, 'associated_users', "")}>
                  Add Associated User
                </button>
                <h3>Instructions</h3>
                {account.instructions.map((instruction, instructionIndex) => (
                  <div key={instructionIndex}>
                    <input
                      type="text"
                      value={instruction.instruction_name || ""}
                      onChange={(e) => handleNestedFieldChange(accountIndex, `instructions.${instructionIndex}.instruction_name`, e.target.value)}
                      placeholder="Instruction Name"
                    />
                    {instruction.parameters.map((parameter, parameterIndex) => (
                      <div key={parameterIndex}>
                        <input
                          type="text"
                          value={parameter.name || ""}
                          onChange={(e) => handleNestedFieldChange(accountIndex, `instructions.${instructionIndex}.parameters.${parameterIndex}.name`, e.target.value)}
                          placeholder="Parameter Name"
                        />
                        <input
                          type="text"
                          value={parameter.type || ""}
                          onChange={(e) => handleNestedFieldChange(accountIndex, `instructions.${instructionIndex}.parameters.${parameterIndex}.type`, e.target.value)}
                          placeholder="Parameter Type"
                        />
                        <input
                          type="checkbox"
                          checked={parameter.required}
                          onChange={(e) => handleNestedFieldChange(accountIndex, `instructions.${instructionIndex}.parameters.${parameterIndex}.required`, e.target.checked)}
                        /> Required
                      </div>
                    ))}
                    <button type="button" onClick={() => addNestedField(accountIndex, `instructions.${instructionIndex}.parameters`, { name: "", type: "", required: true })}>
                      Add Parameter
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => addNestedField(accountIndex, 'instructions', { instruction_name: "", parameters: [{ name: "", type: "", required: true }] })}>
                  Add Instruction
                </button>
                <h3>Permissions</h3>
                <input
                  type="text"
                  value={account.permissions || ""}
                  onChange={(e) => handleFieldChange(accountIndex, 'permissions', e.target.value)}
                  placeholder="Permissions"
                />
                <h3>Settings</h3>
                <input
                  type="text"
                  value={account.settings || ""}
                  onChange={(e) => handleFieldChange(accountIndex, 'settings', e.target.value)}
                  placeholder="Settings"
                />
                <h3>Relationships</h3>
                {account.relationships.map((relationship, relationshipIndex) => (
                  <div key={relationshipIndex}>
                    <input
                      type="text"
                      value={relationship.related_account_id || ""}
                      onChange={(e) => handleNestedFieldChange(accountIndex, `relationships.${relationshipIndex}.related_account_id`, e.target.value)}
                      placeholder="Related Account ID"
                    />
                    <input
                      type="text"
                      value={relationship.relationship_type || ""}
                      onChange={(e) => handleNestedFieldChange(accountIndex, `relationships.${relationshipIndex}.relationship_type`, e.target.value)}
                      placeholder="Relationship Type"
                    />
                    <input
                      type="text"
                      value={relationship.details || ""}
                      onChange={(e) => handleNestedFieldChange(accountIndex, `relationships.${relationshipIndex}.details`, e.target.value)}
                      placeholder="Details"
                    />
                  </div>
                ))}
                <button type="button" onClick={() => addNestedField(accountIndex, 'relationships', { related_account_id: "", relationship_type: "", details: "" })}>
                  Add Relationship
                </button>
                <h3>Security</h3>
                <input
                  type="text"
                  value={account.security.requirements || ""}
                  onChange={(e) => handleFieldChange(accountIndex, 'security.requirements', e.target.value)}
                  placeholder="Security Requirements"
                />
                <input
                  type="text"
                  value={account.security.audit_logging || ""}
                  onChange={(e) => handleFieldChange(accountIndex, 'security.audit_logging', e.target.value)}
                  placeholder="Audit Logging"
                />
                <h3>Performance Metrics</h3>
                {account.performance_metrics.map((metric, metricIndex) => (
                  <div key={metricIndex}>
                    <input
                      type="text"
                      value={metric.metric || ""}
                      onChange={(e) => handleNestedFieldChange(accountIndex, `performance_metrics.${metricIndex}.metric`, e.target.value)}
                      placeholder="Metric"
                    />
                    <input
                      type="text"
                      value={metric.description || ""}
                      onChange={(e) => handleNestedFieldChange(accountIndex, `performance_metrics.${metricIndex}.description`, e.target.value)}
                      placeholder="Description"
                    />
                  </div>
                ))}
                <button type="button" onClick={() => addNestedField(accountIndex, 'performance_metrics', { metric: "", description: "" })}>
                  Add Performance Metric
                </button>
                <h3>Integration Points</h3>
                {account.integration_points.map((integration, integrationIndex) => (
                  <div key={integrationIndex}>
                    <input
                      type="text"
                      value={integration.type || ""}
                      onChange={(e) => handleNestedFieldChange(accountIndex, `integration_points.${integrationIndex}.type`, e.target.value)}
                      placeholder="Type"
                    />
                    <input
                      type="text"
                      value={integration.description || ""}
                      onChange={(e) => handleNestedFieldChange(accountIndex, `integration_points.${integrationIndex}.description`, e.target.value)}
                      placeholder="Description"
                    />
                  </div>
                ))}
                <button type="button" onClick={() => addNestedField(accountIndex, 'integration_points', { type: "", description: "" })}>
                  Add Integration Point
                </button>
                <h3>Error Handling</h3>
                {account.error_handling.error_codes.map((error, errorIndex) => (
                  <div key={errorIndex}>
                    <input
                      type="text"
                      value={error || ""}
                      onChange={(e) => handleNestedFieldChange(accountIndex, `error_handling.error_codes.${errorIndex}`, e.target.value)}
                      placeholder="Error Message"
                    />
                  </div>
                ))}
                <button type="button" onClick={() => addNestedField(accountIndex, 'error_handling.error_codes', "")}>
                  Add Error Code
                </button>
                <h3>Testing</h3>
                {account.testing.test_cases.map((testCase, testCaseIndex) => (
                  <div key={testCaseIndex}>
                    <input
                      type="text"
                      value={testCase.test_case_id || ""}
                      onChange={(e) => handleNestedFieldChange(accountIndex, `testing.test_cases.${testCaseIndex}.test_case_id`, e.target.value)}
                      placeholder="Test Case ID"
                    />
                    <input
                      type="text"
                      value={testCase.description || ""}
                      onChange={(e) => handleNestedFieldChange(accountIndex, `testing.test_cases.${testCaseIndex}.description`, e.target.value)}
                      placeholder="Description"
                    />
                    <input
                      type="text"
                      value={testCase.expected_result || ""}
                      onChange={(e) => handleNestedFieldChange(accountIndex, `testing.test_cases.${testCaseIndex}.expected_result`, e.target.value)}
                      placeholder="Expected Result"
                    />
                  </div>
                ))}
                <button type="button" onClick={() => addNestedField(accountIndex, 'testing.test_cases', { test_case_id: "", description: "", expected_result: "" })}>
                  Add Test Case
                </button>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default ProgramAccountForm;
