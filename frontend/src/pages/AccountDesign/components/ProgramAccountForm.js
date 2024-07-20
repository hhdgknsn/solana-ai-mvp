import React, { useState } from 'react';

const ProgramAccountForm = ({
  programAccounts,
  handleFieldChange,
  handleNestedFieldChange,
  addField,
  addNestedField,
  setProgramAccounts,
}) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="form-div">
      <button type="button" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Program Account Form" : "Add Program Account"}
      </button>
      {showForm && (
        <>
          {programAccounts.map((account, accountIndex) => (
            <div key={accountIndex}>
              <select
                value={account.account_type}
                onChange={(e) => handleFieldChange(setProgramAccounts, accountIndex, 'account_type', e.target.value)}
              >
                <option value="ProgramAccount">ProgramAccount</option>
              </select>
              <input
                type="text"
                value={account.program_type || ""}
                onChange={(e) => handleFieldChange(setProgramAccounts, accountIndex, 'program_type', e.target.value)}
                placeholder="Program Type"
              />
              {/* Other input fields go here */}
              <h3>Associated Users</h3>
              {account.associated_users.map((user, userIndex) => (
                <input
                  key={userIndex}
                  type="text"
                  value={user || ""}
                  onChange={(e) => handleNestedFieldChange(setProgramAccounts, accountIndex, 'associated_users', userIndex, 'user', e.target.value)}
                  placeholder="Associated User"
                />
              ))}
              <button type="button" onClick={() => addNestedField(setProgramAccounts, accountIndex, 'associated_users', "")}>
                Add Associated User
              </button>
              {/* Other sections go here */}
            </div>
          ))}
          <button type="button" onClick={() => addField(setProgramAccounts, { account_type: "ProgramAccount", program_type: "", public_key: "", private_key: "", owner: "", name: "", code_hash: "", creation_timestamp: "", version: "", metadata: "", status: "", associated_users: [], instructions: [{ instruction_name: "", parameters: [{ name: "", type: "", required: true }] }], permissions: "", settings: "", relationships: [], security: { requirements: "", audit_logging: "" }, performance_metrics: [], integration_points: [], error_handling: { error_codes: [] }, testing: { test_cases: [] } })}>
            Add Program Account
          </button>
        </>
      )}
    </div>
  );
};

export default ProgramAccountForm;
