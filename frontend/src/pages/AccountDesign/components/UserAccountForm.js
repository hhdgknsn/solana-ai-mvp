import React, { useState } from 'react';

const UserAccountForm = ({
  accounts,
  handleFieldChange,
  handleNestedFieldChange,
  addField,
  addNestedField,
  setUserAccounts,
}) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="form-div">
      <button type="button" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide User Account Form" : "Add User Account"}
      </button>
      {showForm && (
        <>
          {accounts.map((account, accountIndex) => (
            <div key={accountIndex}>
              <select
                value={account.account_type}
                onChange={(e) => handleFieldChange(setUserAccounts, accountIndex, 'account_type', e.target.value)}
              >
                <option value="">Select Account Type</option>
                <option value="Type1">Type1</option>
                <option value="Type2">Type2</option>
              </select>
              <input
                type="text"
                value={account.public_key || ""}
                onChange={(e) => handleFieldChange(setUserAccounts, accountIndex, 'public_key', e.target.value)}
                placeholder="Public Key"
              />
              {/* Other input fields go here */}
              <h3>Relationships</h3>
              {account.relationships.map((relationship, relationshipIndex) => (
                <div key={relationshipIndex}>
                  <input
                    type="text"
                    value={relationship.related_account_id || ""}
                    onChange={(e) => handleNestedFieldChange(setUserAccounts, accountIndex, 'relationships', relationshipIndex, 'related_account_id', e.target.value)}
                    placeholder="Related Account ID"
                  />
                  {/* Other nested fields go here */}
                </div>
              ))}
              <button type="button" onClick={() => addNestedField(setUserAccounts, accountIndex, 'relationships', { related_account_id: "", relationship_type: "", details: "" })}>
                Add Relationship
              </button>
              {/* Other sections go here */}
            </div>
          ))}
          <button type="button" onClick={() => addField(setUserAccounts, { account_type: "", public_key: "", private_key: "", owner: "", balance: "", creation_timestamp: "", nonce: "", name: "", metadata: "", email: "", permissions: "", associated_programs: "", transaction_history: "", settings: "", status: "", expiration_date: "", profile_info: "", relationships: [], security: { requirements: "", audit_logging: "" }, validation_rules: [], events: [], error_handling: { error_codes: [] }, testing: { test_cases: [] } })}>
            Add User Account
          </button>
        </>
      )}
    </div>
  );
};

export default UserAccountForm;
