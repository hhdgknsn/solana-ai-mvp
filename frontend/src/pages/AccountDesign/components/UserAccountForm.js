import React, { useState, useEffect } from 'react';

const UserAccountForm = ({ accounts, handleFieldChange, addField, addNestedField }) => {
  const [expandedFormIndex, setExpandedFormIndex] = useState(null);

  const toggleFormVisibility = (index) => {
    setExpandedFormIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="section">
      <div className="section-header">
        <button
          className="add-button"
          type="button"
          onClick={() =>
            addField('account_design.user_accounts', {
              account_type: "",
              public_key: "",
              private_key: "",
              owner: "",
              balance: "",
              creation_timestamp: "",
              nonce: "",
              name: "",
              metadata: "",
              email: "",
              permissions: "",
              associated_programs: "",
              transaction_history: "",
              settings: "",
              status: "",
              expiration_date: "",
              profile_info: "",
              relationships: [],
              security: { requirements: "", audit_logging: "" },
              validation_rules: [],
              events: [],
              error_handling: { error_codes: [] },
              testing: { test_cases: [] },
            })
          }
        >
          Add User Account
        </button>
      </div>
      <div className="section-content">
        <div className="account-buttons">
          {accounts.map((account, accountIndex) => (
            <button
              key={accountIndex}
              type="button"
              className="account-button"
              onClick={() => toggleFormVisibility(accountIndex)}
            >
              {expandedFormIndex === accountIndex ? `Hide User Account ${accountIndex + 1}` : `Edit User Account ${accountIndex + 1}`}
            </button>
          ))}
        </div>
        {accounts.map(
          (account, accountIndex) =>
            expandedFormIndex === accountIndex && (
              <div key={accountIndex} className="account-form-container">
                <div className="account-form">
                  <h3>User Account {accountIndex + 1}</h3>
                  <select
                    value={account.account_type}
                    onChange={(e) => handleFieldChange('account_design.user_accounts', accountIndex, 'account_type', e.target.value)}
                  >
                    <option value="">Select Account Type</option>
                    <option value="Type1">Type1</option>
                    <option value="Type2">Type2</option>
                  </select>
                  <input
                    type="text"
                    value={account.public_key || ""}
                    onChange={(e) => handleFieldChange('account_design.user_accounts', accountIndex, 'public_key', e.target.value)}
                    placeholder="Public Key"
                  />
                  <input
                    type="text"
                    value={account.private_key || ""}
                    onChange={(e) => handleFieldChange('account_design.user_accounts', accountIndex, 'private_key', e.target.value)}
                    placeholder="Private Key"
                  />
                  <input
                    type="text"
                    value={account.owner || ""}
                    onChange={(e) => handleFieldChange('account_design.user_accounts', accountIndex, 'owner', e.target.value)}
                    placeholder="Owner"
                  />
                  <input
                    type="text"
                    value={account.balance || ""}
                    onChange={(e) => handleFieldChange('account_design.user_accounts', accountIndex, 'balance', e.target.value)}
                    placeholder="Balance"
                  />
                  <input
                    type="text"
                    value={account.creation_timestamp || ""}
                    onChange={(e) => handleFieldChange('account_design.user_accounts', accountIndex, 'creation_timestamp', e.target.value)}
                    placeholder="Creation Timestamp"
                  />
                  <input
                    type="text"
                    value={account.nonce || ""}
                    onChange={(e) => handleFieldChange('account_design.user_accounts', accountIndex, 'nonce', e.target.value)}
                    placeholder="Nonce"
                  />
                  <input
                    type="text"
                    value={account.name || ""}
                    onChange={(e) => handleFieldChange('account_design.user_accounts', accountIndex, 'name', e.target.value)}
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    value={account.metadata || ""}
                    onChange={(e) => handleFieldChange('account_design.user_accounts', accountIndex, 'metadata', e.target.value)}
                    placeholder="Metadata"
                  />
                  <input
                    type="email"
                    value={account.email || ""}
                    onChange={(e) => handleFieldChange('account_design.user_accounts', accountIndex, 'email', e.target.value)}
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    value={account.permissions || ""}
                    onChange={(e) => handleFieldChange('account_design.user_accounts', accountIndex, 'permissions', e.target.value)}
                    placeholder="Permissions"
                  />
                  <input
                    type="text"
                    value={account.associated_programs || ""}
                    onChange={(e) => handleFieldChange('account_design.user_accounts', accountIndex, 'associated_programs', e.target.value)}
                    placeholder="Associated Programs"
                  />
                  <input
                    type="text"
                    value={account.transaction_history || ""}
                    onChange={(e) => handleFieldChange('account_design.user_accounts', accountIndex, 'transaction_history', e.target.value)}
                    placeholder="Transaction History"
                  />
                  <input
                    type="text"
                    value={account.settings || ""}
                    onChange={(e) => handleFieldChange('account_design.user_accounts', accountIndex, 'settings', e.target.value)}
                    placeholder="Settings"
                  />
                  <input
                    type="text"
                    value={account.status || ""}
                    onChange={(e) => handleFieldChange('account_design.user_accounts', accountIndex, 'status', e.target.value)}
                    placeholder="Status"
                  />
                  <input
                    type="text"
                    value={account.expiration_date || ""}
                    onChange={(e) => handleFieldChange('account_design.user_accounts', accountIndex, 'expiration_date', e.target.value)}
                    placeholder="Expiration Date"
                  />
                  <input
                    type="text"
                    value={account.profile_info || ""}
                    onChange={(e) => handleFieldChange('account_design.user_accounts', accountIndex, 'profile_info', e.target.value)}
                    placeholder="Profile Info"
                  />
                  <h3>Relationships</h3>
                  {account.relationships.map((relationship, relationshipIndex) => (
                    <div key={relationshipIndex}>
                      <input
                        type="text"
                        value={relationship.related_account_id || ""}
                        onChange={(e) => handleFieldChange(`account_design.user_accounts.${accountIndex}.relationships`, relationshipIndex, 'related_account_id', e.target.value)}
                        placeholder="Related Account ID"
                      />
                      <input
                        type="text"
                        value={relationship.relationship_type || ""}
                        onChange={(e) => handleFieldChange(`account_design.user_accounts.${accountIndex}.relationships`, relationshipIndex, 'relationship_type', e.target.value)}
                        placeholder="Relationship Type"
                      />
                      <input
                        type="text"
                        value={relationship.details || ""}
                        onChange={(e) => handleFieldChange(`account_design.user_accounts.${accountIndex}.relationships`, relationshipIndex, 'details', e.target.value)}
                        placeholder="Details"
                      />
                    </div>
                  ))}
                  <button type="button" onClick={() => addNestedField('account_design.user_accounts', accountIndex, 'relationships', { related_account_id: "", relationship_type: "", details: "" })}>
                    Add Relationship
                  </button>
                  <h3>Security</h3>
                  <input
                    type="text"
                    value={account.security.requirements || ""}
                    onChange={(e) => handleFieldChange(`account_design.user_accounts.${accountIndex}.security`, 'requirements', e.target.value)}
                    placeholder="Security Requirements"
                  />
                  <input
                    type="text"
                    value={account.security.audit_logging || ""}
                    onChange={(e) => handleFieldChange(`account_design.user_accounts.${accountIndex}.security`, 'audit_logging', e.target.value)}
                    placeholder="Audit Logging"
                  />
                  <h3>Validation Rules</h3>
                  {account.validation_rules.map((rule, ruleIndex) => (
                    <div key={ruleIndex}>
                      <input
                        type="text"
                        value={rule || ""}
                        onChange={(e) => handleFieldChange(`account_design.user_accounts.${accountIndex}.validation_rules`, ruleIndex, e.target.value)}
                        placeholder="Validation Rule"
                      />
                    </div>
                  ))}
                  <button type="button" onClick={() => addNestedField('account_design.user_accounts', accountIndex, 'validation_rules', "")}>
                    Add Validation Rule
                  </button>
                  <h3>Events</h3>
                  {account.events.map((event, eventIndex) => (
                    <div key={eventIndex}>
                      <input
                        type="text"
                        value={event || ""}
                        onChange={(e) => handleFieldChange(`account_design.user_accounts.${accountIndex}.events`, eventIndex, e.target.value)}
                        placeholder="Event"
                      />
                    </div>
                  ))}
                  <button type="button" onClick={() => addNestedField('account_design.user_accounts', accountIndex, 'events', "")}>
                    Add Event
                  </button>
                  <h3>Error Handling</h3>
                  {account.error_handling.error_codes.map((error, errorIndex) => (
                    <div key={errorIndex}>
                      <input
                        type="text"
                        value={error || ""}
                        onChange={(e) => handleFieldChange(`account_design.user_accounts.${accountIndex}.error_handling.error_codes`, errorIndex, e.target.value)}
                        placeholder="Error Message"
                      />
                    </div>
                  ))}
                  <button type="button" onClick={() => addNestedField('account_design.user_accounts', accountIndex, 'error_handling.error_codes', "")}>
                    Add Error Code
                  </button>
                  <h3>Testing</h3>
                  {account.testing.test_cases.map((testCase, testCaseIndex) => (
                    <div key={testCaseIndex}>
                      <input
                        type="text"
                        value={testCase.test_case_id || ""}
                        onChange={(e) => handleFieldChange(`account_design.user_accounts.${accountIndex}.testing.test_cases`, testCaseIndex, 'test_case_id', e.target.value)}
                        placeholder="Test Case ID"
                      />
                      <input
                        type="text"
                        value={testCase.description || ""}
                        onChange={(e) => handleFieldChange(`account_design.user_accounts.${accountIndex}.testing.test_cases`, testCaseIndex, 'description', e.target.value)}
                        placeholder="Description"
                      />
                      <input
                        type="text"
                        value={testCase.expected_result || ""}
                        onChange={(e) => handleFieldChange(`account_design.user_accounts.${accountIndex}.testing.test_cases`, testCaseIndex, 'expected_result', e.target.value)}
                        placeholder="Expected Result"
                      />
                    </div>
                  ))}
                  <button type="button" onClick={() => addNestedField('account_design.user_accounts', accountIndex, 'testing.test_cases', { test_case_id: "", description: "", expected_result: "" })}>
                    Add Test Case
                  </button>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default UserAccountForm;
