import React from 'react';

const UserAccounts = ({ user_accounts, handleFieldChange, handleSubmit, handleKeyPress }) => {
  return (
    <div>
      {user_accounts.map((account, index) => (
        <div key={index}>
            <div className='form-inner-section'>
                <label>Account Type:</label>
                <input
                    type="text"
                    value={user_accounts.account_type}
                    onChange={(e) => handleFieldChange('account_design', 'user_accounts', index, 'account_type', e.target.value)}
                />
                <button type='submit' onClick={() => handleSubmit('account_design', 'user_accounts', index, 'account_type', account.account_type)}>
                    ➔
                </button>
            </div>
            <div className='form-inner-section'>
                <label>Public Key:</label>
                <input
                    type="text"
                    value={user_accounts.public_key}
                    onChange={(e) => handleFieldChange('account_design', 'user_accounts', index, 'public_key', e.target.value)}
                />
                <button type='submit' onClick={() => handleSubmit('account_design', index, 'public_key', account.public_key)}>
                    ➔
                </button>
            </div>
            <div className='form-inner-section'>
                <label>Private Key:</label>
                <input
                    type="text"
                    value={user_accounts.private_key}
                    onChange={(e) => handleFieldChange('account_design', 'user_accounts', index, 'private_key', e.target.value)}
                />
                <button type='submit' onClick={() => handleSubmit('account_design', index, 'private_key', account.private_key)}>
                    ➔
                </button>
            </div>
            <div className='form-inner-section'>
                <label>Owner:</label>
                <input
                    type="text"
                    value={user_accounts.owner}
                    onChange={(e) => handleFieldChange('account_design', 'user_accounts', index, 'owner', e.target.value)}
                />
                <button type='submit' onClick={() => handleSubmit('account_design', index, 'owner', account.owner)}>
                    ➔
                </button>
            </div>
            <div className='form-inner-section'>
                <label>Balance:</label>
                <input
                    type="text"
                    value={user_accounts.balance}
                    onChange={(e) => handleFieldChange('account_design', 'user_accounts', index, 'balance', e.target.value)}
                />
                <button type='submit' onClick={() => handleSubmit('account_design', index, 'balance', account.owner)}>
                    ➔
                </button>
            </div>
            <div className='form-inner-section'>
                <label>Permissions:</label>
                <input
                    type="text"
                    value={user_accounts.permissions}
                    onChange={(e) => handleFieldChange('account_design', 'user_accounts', index, 'permissions', e.target.value)}
                />
                <button type='submit' onClick={() => handleSubmit('account_design', index, 'permissions', account.permissions)}>
                    ➔
                </button>
            </div>
            
            
        </div>
      ))}
    </div>
  );
};

export default UserAccounts;
