import React from 'react';

const UserAccountForm = ({
  accounts,
  handleFieldChange,
  handleNestedFieldChange,
  addField,
  addNestedField,
  setUserAccounts,
}) => (
  <div className="form-div">
    <h2>User Accounts</h2>
    {accounts.map((account, accountIndex) => (
      <div key={accountIndex}>
        <select
          value={account.account_type}
          onChange={(e) => handleFieldChange(setUserAccounts, accountIndex, 'account_type', e.target.value)}
          required
        >
          <option value="">Select Account Type</option>
          <option value="Type1">Type1</option>
          <option value="Type2">Type2</option>
        </select>
        <input
          type="text"
          value={account.public_key}
          onChange={(e) => handleFieldChange(setUserAccounts, accountIndex, 'public_key', e.target.value)}
          placeholder="Public Key"
          required
        />
        <input
          type="text"
          value={account.private_key}
          onChange={(e) => handleFieldChange(setUserAccounts, accountIndex, 'private_key', e.target.value)}
          placeholder="Private Key"
          required
        />
        <input
          type="text"
          value={account.owner}
          onChange={(e) => handleFieldChange(setUserAccounts, accountIndex, 'owner', e.target.value)}
          placeholder="Owner"
          required
        />
        <input
          type="number"
          value={account.balance}
          onChange={(e) => handleFieldChange(setUserAccounts, accountIndex, 'balance', e.target.value)}
          placeholder="Balance"
          required
        />
        <input
          type="text"
          value={account.creation_timestamp}
          onChange={(e) => handleFieldChange(setUserAccounts, accountIndex, 'creation_timestamp', e.target.value)}
          placeholder="Creation Timestamp"
          required
        />
        <input
          type="number"
          value={account.nonce}
          onChange={(e) => handleFieldChange(setUserAccounts, accountIndex, 'nonce', e.target.value)}
          placeholder="Nonce"
          required
        />
        <input
          type="text"
          value={account.name}
          onChange={(e) => handleFieldChange(setUserAccounts, accountIndex, 'name', e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={account.metadata}
          onChange={(e) => handleFieldChange(setUserAccounts, accountIndex, 'metadata', e.target.value)}
          placeholder="Metadata"
          required
        />
        <input
          type="email"
          value={account.email}
          onChange={(e) => handleFieldChange(setUserAccounts, accountIndex, 'email', e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={account.permissions}
          onChange={(e) => handleFieldChange(setUserAccounts, accountIndex, 'permissions', e.target.value)}
          placeholder="Permissions"
          required
        />
        <input
          type="text"
          value={account.associated_programs}
          onChange={(e) => handleFieldChange(setUserAccounts, accountIndex, 'associated_programs', e.target.value)}
          placeholder="Associated Programs"
          required
        />
        <input
          type="text"
          value={account.transaction_history}
          onChange={(e) => handleFieldChange(setUserAccounts, accountIndex, 'transaction_history', e.target.value)}
          placeholder="Transaction History"
          required
        />
        <input
          type="text"
          value={account.settings}
          onChange={(e) => handleFieldChange(setUserAccounts, accountIndex, 'settings', e.target.value)}
          placeholder="Settings"
          required
        />
        <input
          type="text"
          value={account.status}
          onChange={(e) => handleFieldChange(setUserAccounts, accountIndex, 'status', e.target.value)}
          placeholder="Status"
          required
        />
        <input
          type="date"
          value={account.expiration_date}
          onChange={(e) => handleFieldChange(setUserAccounts, accountIndex, 'expiration_date', e.target.value)}
          placeholder="Expiration Date"
          required
        />
        <textarea
          value={account.profile_info}
          onChange={(e) => handleFieldChange(setUserAccounts, accountIndex, 'profile_info', e.target.value)}
          placeholder="Profile Info"
          required
        />

        <h3>Relationships</h3>
        {account.relationships.map((relationship, relationshipIndex) => (
          <div key={relationshipIndex}>
            <input
              type="text"
              value={relationship.related_account_id}
              onChange={(e) => handleNestedFieldChange(setUserAccounts, accountIndex, 'relationships', relationshipIndex, 'related_account_id', e.target.value)}
              placeholder="Related Account ID"
              required
            />
            <input
              type="text"
              value={relationship.relationship_type}
              onChange={(e) => handleNestedFieldChange(setUserAccounts, accountIndex, 'relationships', relationshipIndex, 'relationship_type', e.target.value)}
              placeholder="Relationship Type"
              required
            />
            <textarea
              value={relationship.details}
              onChange={(e) => handleNestedFieldChange(setUserAccounts, accountIndex, 'relationships', relationshipIndex, 'details', e.target.value)}
              placeholder="Details"
              required
            />
          </div>
        ))}
        <button type="button" onClick={() => addNestedField(setUserAccounts, accountIndex, 'relationships', { related_account_id: "", relationship_type: "", details: "" })}>
          Add Relationship
        </button>

        <h3>Security</h3>
        <input
          type="text"
          value={account.security.requirements}
          onChange={(e) => handleNestedFieldChange(setUserAccounts, accountIndex, 'security', 'requirements', e.target.value)}
          placeholder="Security Requirements"
          required
        />
        <input
          type="text"
          value={account.security.audit_logging}
          onChange={(e) => handleNestedFieldChange(setUserAccounts, accountIndex, 'security', 'audit_logging', e.target.value)}
          placeholder="Audit Logging"
          required
        />

        <h3>Validation Rules</h3>
        {account.validation_rules.map((rule, ruleIndex) => (
          <div key={ruleIndex}>
            <input
              type="text"
              value={rule.field_name}
              onChange={(e) => handleNestedFieldChange(setUserAccounts, accountIndex, 'validation_rules', ruleIndex, 'field_name', e.target.value)}
              placeholder="Field Name"
              required
            />
            <input
              type="text"
              value={rule.validation_type}
              onChange={(e) => handleNestedFieldChange(setUserAccounts, accountIndex, 'validation_rules', ruleIndex, 'validation_type', e.target.value)}
              placeholder="Validation Type"
              required
            />
            <input
              type="text"
              value={rule.constraints}
              onChange={(e) => handleNestedFieldChange(setUserAccounts, accountIndex, 'validation_rules', ruleIndex, 'constraints', e.target.value)}
              placeholder="Constraints"
              required
            />
          </div>
        ))}
        <button type="button" onClick={() => addNestedField(setUserAccounts, accountIndex, 'validation_rules', { field_name: "", validation_type: "", constraints: "" })}>
          Add Validation Rule
        </button>

        <h3>Events</h3>
        {account.events.map((event, eventIndex) => (
          <div key={eventIndex}>
            <input
              type="text"
              value={event.event_type}
              onChange={(e) => handleNestedFieldChange(setUserAccounts, accountIndex, 'events', eventIndex, 'event_type', e.target.value)}
              placeholder="Event Type"
              required
            />
            <textarea
              value={event.event_data}
              onChange={(e) => handleNestedFieldChange(setUserAccounts, accountIndex, 'events', eventIndex, 'event_data', e.target.value)}
              placeholder="Event Data"
              required
            />
          </div>
        ))}
        <button type="button" onClick={() => addNestedField(setUserAccounts, accountIndex, 'events', { event_type: "", event_data: "" })}>
          Add Event
        </button>

        <h3>Error Handling</h3>
        {account.error_handling.error_codes.map((errorCode, errorCodeIndex) => (
          <div key={errorCodeIndex}>
            <input
              type="number"
              value={errorCode.code}
              onChange={(e) => handleNestedFieldChange(setUserAccounts, accountIndex, 'error_handling', 'error_codes', errorCodeIndex, 'code', e.target.value)}
              placeholder="Error Code"
              required
            />
            <input
              type="text"
              value={errorCode.message}
              onChange={(e) => handleNestedFieldChange(setUserAccounts, accountIndex, 'error_handling', 'error_codes', errorCodeIndex, 'message', e.target.value)}
              placeholder="Error Message"
              required
            />
          </div>
        ))}
        <button type="button" onClick={() => addNestedField(setUserAccounts, accountIndex, 'error_handling', { code: 0, message: "" })}>
          Add Error Code
        </button>

        <h3>Testing</h3>
        {account.testing.test_cases.map((testCase, testCaseIndex) => (
          <div key={testCaseIndex}>
            <input
              type="text"
              value={testCase.test_case_id}
              onChange={(e) => handleNestedFieldChange(setUserAccounts, accountIndex, 'testing', testCaseIndex, 'test_case_id', e.target.value)}
              placeholder="Test Case ID"
              required
            />
            <textarea
              value={testCase.description}
              onChange={(e) => handleNestedFieldChange(setUserAccounts, accountIndex, 'testing', testCaseIndex, 'description', e.target.value)}
              placeholder="Description"
              required
            />
            <input
              type="text"
              value={testCase.expected_result}
              onChange={(e) => handleNestedFieldChange(setUserAccounts, accountIndex, 'testing', testCaseIndex, 'expected_result', e.target.value)}
              placeholder="Expected Result"
              required
            />
          </div>
        ))}
        <button type="button" onClick={() => addNestedField(setUserAccounts, accountIndex, 'testing', { test_case_id: "", description: "", expected_result: "" })}>
          Add Test Case
        </button>
      </div>
    ))}
    <button type="button" onClick={() => addField(setUserAccounts, { account_type: "", public_key: "", private_key: "", owner: "", balance: "", creation_timestamp: "", nonce: "", name: "", metadata: "", email: "", permissions: "", associated_programs: "", transaction_history: "", settings: "", status: "", expiration_date: "", profile_info: "", relationships: [], security: { requirements: "", audit_logging: "" }, validation_rules: [], events: [], error_handling: { error_codes: [] }, testing: { test_cases: [] } })}>
      Add User Account
    </button>
  </div>
);

export default UserAccountForm;
