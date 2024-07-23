import React from 'react';

const ProgramAccounts = ({ program_accounts, handleFieldChange, handleSubmit, handleKeyPress }) => {
  return (
    <div>
      {program_accounts.map((account, index) => (
        <div key={index}>
            <div className='form-inner-section'>
                <label>Account Type:</label>
                <input
                    type="text"
                    value={program_accounts.account_type}
                    onChange={(e) => handleFieldChange('account_design', 'program_accounts', index, 'account_type', e.target.value)}
                />
                <button type='submit' onClick={() => handleSubmit('account_design', index, 'account_type', account.account_type)}>
                    ➔
                </button>
            </div>
            <div className='form-inner-section'>
                <label>Program Type:</label>
                <input
                    type="text"
                    value={program_accounts.account_type}
                    onChange={(e) => handleFieldChange('account_design', 'program_accounts', index, 'program_type', e.target.value)}
                />
                <button type='submit' onClick={() => handleSubmit('account_design', index, 'program_type', account.program_type)}>
                    ➔
                </button>
            </div>
            <div className='form-inner-section'>
                <label>Public Key:</label>
                <input
                    type="text"
                    value={program_accounts.public_key}
                    onChange={(e) => handleFieldChange('account_design', 'program_accounts', index, 'public_key', e.target.value)}
                />
                <button type='submit' onClick={() => handleSubmit('account_design', index, 'public_key', account.public_key)}>
                    ➔
                </button>
            </div>
            <div className='form-inner-section'>
                <label>Owner:</label>
                <input
                    type="text"
                    value={program_accounts.owner}
                    onChange={(e) => handleFieldChange('account_design', 'program_accounts', index, 'owner', e.target.value)}
                />
                <button type='submit' onClick={() => handleSubmit('account_design', index, 'owner', account.owner)}>
                    ➔
                </button>
            </div>
            <div className='form-inner-section'>
                <label>Name:</label>
                <input
                    type="text"
                    value={program_accounts.name}
                    onChange={(e) => handleFieldChange('account_design', 'program_accounts', index, 'name', e.target.value)}
                />
                <button type='submit' onClick={() => handleSubmit('account_design', index, 'name', account.name)}>
                    ➔
                </button>
            </div>
            <div className='form-inner-section'>
                <label>Settings:</label>
                <input
                    type="text"
                    value={program_accounts.settings}
                    onChange={(e) => handleFieldChange('account_design', 'program_accounts', index, 'settings', e.target.value)}
                />
                <button type='submit' onClick={() => handleSubmit('account_design', index, 'settings', account.settings)}>
                    ➔
                </button>
            </div>
          
            
            
        </div>
      ))}
    </div>
  );
};

export default ProgramAccounts;
