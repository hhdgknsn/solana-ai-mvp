import React from 'react';

const ProgramAccountForm = ({
  programAccounts,
  handleFieldChange,
  handleNestedFieldChange,
  addField,
  addNestedField,
  setProgramAccounts,
}) => (
  <div className="form-div">
    <h2>Program Accounts</h2>
    {programAccounts.map((account, accountIndex) => (
      <div key={accountIndex}>
        <select
          value={account.account_type}
          onChange={(e) => handleFieldChange(setProgramAccounts, accountIndex, 'account_type', e.target.value)}
          required
        >
          <option value="ProgramAccount">ProgramAccount</option>
        </select>
        <input
          type="text"
          value={account.program_type}
          onChange={(e) => handleFieldChange(setProgramAccounts, accountIndex, 'program_type', e.target.value)}
          placeholder="Program Type"
          required
        />
        <input
          type="text"
          value={account.public_key}
          onChange={(e) => handleFieldChange(setProgramAccounts, accountIndex, 'public_key', e.target.value)}
          placeholder="Public Key"
          required
        />
        <input
          type="text"
          value={account.private_key}
          onChange={(e) => handleFieldChange(setProgramAccounts, accountIndex, 'private_key', e.target.value)}
          placeholder="Private Key"
          required
        />
        <input
          type="text"
          value={account.owner}
          onChange={(e) => handleFieldChange(setProgramAccounts, accountIndex, 'owner', e.target.value)}
          placeholder="Owner"
          required
        />
        <input
          type="text"
          value={account.name}
          onChange={(e) => handleFieldChange(setProgramAccounts, accountIndex, 'name', e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={account.code_hash}
          onChange={(e) => handleFieldChange(setProgramAccounts, accountIndex, 'code_hash', e.target.value)}
          placeholder="Code Hash"
          required
        />
        <input
          type="text"
          value={account.creation_timestamp}
          onChange={(e) => handleFieldChange(setProgramAccounts, accountIndex, 'creation_timestamp', e.target.value)}
          placeholder="Creation Timestamp"
          required
        />
        <input
          type="text"
          value={account.version}
          onChange={(e) => handleFieldChange(setProgramAccounts, accountIndex, 'version', e.target.value)}
          placeholder="Version"
          required
        />
        <input
          type="text"
          value={account.metadata}
          onChange={(e) => handleFieldChange(setProgramAccounts, accountIndex, 'metadata', e.target.value)}
          placeholder="Metadata"
          required
        />
        <input
          type="text"
          value={account.status}
          onChange={(e) => handleFieldChange(setProgramAccounts, accountIndex, 'status', e.target.value)}
          placeholder="Status"
          required
        />

        <h3>Associated Users</h3>
        {account.associated_users.map((user, userIndex) => (
          <input
            key={userIndex}
            type="text"
            value={user}
            onChange={(e) => handleNestedFieldChange(setProgramAccounts, accountIndex, 'associated_users', userIndex, 'user', e.target.value)}
            placeholder="Associated User"
            required
          />
        ))}
        <button type="button" onClick={() => addNestedField(setProgramAccounts, accountIndex, 'associated_users', "")}>
          Add Associated User
        </button>

        <h3>Instructions</h3>
        {account.instructions.map((instruction, instructionIndex) => (
          <div key={instructionIndex}>
            <input
              type="text"
              value={instruction.instruction_name}
              onChange={(e) => handleNestedFieldChange(setProgramAccounts, accountIndex, 'instructions', instructionIndex, 'instruction_name', e.target.value)}
              placeholder="Instruction Name"
              required
            />
            {instruction.parameters.map((param, paramIndex) => (
              <div key={paramIndex}>
                <input
                  type="text"
                  value={param.name}
                  onChange={(e) => handleNestedFieldChange(setProgramAccounts, accountIndex, 'instructions', instructionIndex, 'parameters', paramIndex, 'name', e.target.value)}
                  placeholder="Parameter Name"
                  required={param.required}
                />
                <input
                  type="text"
                  value={param.type}
                  onChange={(e) => handleNestedFieldChange(setProgramAccounts, accountIndex, 'instructions', instructionIndex, 'parameters', paramIndex, 'type', e.target.value)}
                  placeholder="Parameter Type"
                  required={param.required}
                />
                <label>
                  <input
                    type="checkbox"
                    checked={param.required}
                    onChange={(e) => handleNestedFieldChange(setProgramAccounts, accountIndex, 'instructions', instructionIndex, 'parameters', paramIndex, 'required', e.target.checked)}
                  />
                  Required
                </label>
              </div>
            ))}
            <button type="button" onClick={() => addNestedField(setProgramAccounts, accountIndex, 'instructions', { instruction_name: "", parameters: [{ name: "", type: "", required: true }] })}>
              Add Parameter
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addNestedField(setProgramAccounts, accountIndex, 'instructions', { instruction_name: "", parameters: [{ name: "", type: "", required: true }] })}>
          Add Instruction
        </button>

        <input
          type="text"
          value={account.permissions}
          onChange={(e) => handleFieldChange(setProgramAccounts, accountIndex, 'permissions', e.target.value)}
          placeholder="Permissions"
          required
        />
        <input
          type="text"
          value={account.settings}
          onChange={(e) => handleFieldChange(setProgramAccounts, accountIndex, 'settings', e.target.value)}
          placeholder="Settings"
          required
        />

        <h3>Relationships</h3>
        {account.relationships.map((relationship, relationshipIndex) => (
          <div key={relationshipIndex}>
            <input
              type="text"
              value={relationship.related_account_id}
              onChange={(e) => handleNestedFieldChange(setProgramAccounts, accountIndex, 'relationships', relationshipIndex, 'related_account_id', e.target.value)}
              placeholder="Related Account ID"
              required
            />
            <input
              type="text"
              value={relationship.relationship_type}
              onChange={(e) => handleNestedFieldChange(setProgramAccounts, accountIndex, 'relationships', relationshipIndex, 'relationship_type', e.target.value)}
              placeholder="Relationship Type"
              required
            />
            <textarea
              value={relationship.details}
              onChange={(e) => handleNestedFieldChange(setProgramAccounts, accountIndex, 'relationships', relationshipIndex, 'details', e.target.value)}
              placeholder="Details"
              required
            />
          </div>
        ))}
        <button type="button" onClick={() => addNestedField(setProgramAccounts, accountIndex, 'relationships', { related_account_id: "", relationship_type: "", details: "" })}>
          Add Relationship
        </button>

        <h3>Security</h3>
        <input
          type="text"
          value={account.security.requirements}
          onChange={(e) => handleNestedFieldChange(setProgramAccounts, accountIndex, 'security', 'requirements', e.target.value)}
          placeholder="Security Requirements"
          required
        />
        <input
          type="text"
          value={account.security.audit_logging}
          onChange={(e) => handleNestedFieldChange(setProgramAccounts, accountIndex, 'security', 'audit_logging', e.target.value)}
          placeholder="Audit Logging"
          required
        />

        <h3>Performance Metrics</h3>
        {account.performance_metrics.map((metric, metricIndex) => (
          <div key={metricIndex}>
            <input
              type="text"
              value={metric.metric}
              onChange={(e) => handleNestedFieldChange(setProgramAccounts, accountIndex, 'performance_metrics', metricIndex, 'metric', e.target.value)}
              placeholder="Metric"
              required
            />
            <input
              type="text"
              value={metric.description}
              onChange={(e) => handleNestedFieldChange(setProgramAccounts, accountIndex, 'performance_metrics', metricIndex, 'description', e.target.value)}
              placeholder="Description"
              required
            />
          </div>
        ))}
        <button type="button" onClick={() => addNestedField(setProgramAccounts, accountIndex, 'performance_metrics', { metric: "", description: "" })}>
          Add Performance Metric
        </button>

        <h3>Integration Points</h3>
        {account.integration_points.map((integration, integrationIndex) => (
          <div key={integrationIndex}>
            <input
              type="text"
              value={integration.type}
              onChange={(e) => handleNestedFieldChange(setProgramAccounts, accountIndex, 'integration_points', integrationIndex, 'type', e.target.value)}
              placeholder="Type"
              required
            />
            <input
              type="text"
              value={integration.description}
              onChange={(e) => handleNestedFieldChange(setProgramAccounts, accountIndex, 'integration_points', integrationIndex, 'description', e.target.value)}
              placeholder="Description"
              required
            />
          </div>
        ))}
        <button type="button" onClick={() => addNestedField(setProgramAccounts, accountIndex, 'integration_points', { type: "", description: "" })}>
          Add Integration Point
        </button>

        <h3>Error Handling</h3>
        {account.error_handling.error_codes.map((errorCode, errorCodeIndex) => (
          <div key={errorCodeIndex}>
            <input
              type="number"
              value={errorCode.code}
              onChange={(e) => handleNestedFieldChange(setProgramAccounts, accountIndex, 'error_handling', 'error_codes', errorCodeIndex, 'code', e.target.value)}
              placeholder="Error Code"
              required
            />
            <input
              type="text"
              value={errorCode.message}
              onChange={(e) => handleNestedFieldChange(setProgramAccounts, accountIndex, 'error_handling', 'error_codes', errorCodeIndex, 'message', e.target.value)}
              placeholder="Error Message"
              required
            />
          </div>
        ))}
        <button type="button" onClick={() => addNestedField(setProgramAccounts, accountIndex, 'error_handling', { code: 0, message: "" })}>
          Add Error Code
        </button>

        <h3>Testing</h3>
        {account.testing.test_cases.map((testCase, testCaseIndex) => (
          <div key={testCaseIndex}>
            <input
              type="text"
              value={testCase.test_case_id}
              onChange={(e) => handleNestedFieldChange(setProgramAccounts, accountIndex, 'testing', testCaseIndex, 'test_case_id', e.target.value)}
              placeholder="Test Case ID"
              required
            />
            <textarea
              value={testCase.description}
              onChange={(e) => handleNestedFieldChange(setProgramAccounts, accountIndex, 'testing', testCaseIndex, 'description', e.target.value)}
              placeholder="Description"
              required
            />
            <input
              type="text"
              value={testCase.expected_result}
              onChange={(e) => handleNestedFieldChange(setProgramAccounts, accountIndex, 'testing', testCaseIndex, 'expected_result', e.target.value)}
              placeholder="Expected Result"
              required
            />
          </div>
        ))}
        <button type="button" onClick={() => addNestedField(setProgramAccounts, accountIndex, 'testing', { test_case_id: "", description: "", expected_result: "" })}>
          Add Test Case
        </button>
      </div>
    ))}
    <button type="button" onClick={() => addField(setProgramAccounts, { account_type: "ProgramAccount", program_type: "", public_key: "", private_key: "", owner: "", name: "", code_hash: "", creation_timestamp: "", version: "", metadata: "", status: "", associated_users: [], instructions: [{ instruction_name: "", parameters: [{ name: "", type: "", required: true }] }], permissions: "", settings: "", relationships: [], security: { requirements: "", audit_logging: "" }, performance_metrics: [], integration_points: [], error_handling: { error_codes: [] }, testing: { test_cases: [] } })}>
      Add Program Account
    </button>
  </div>
);

export default ProgramAccountForm;
