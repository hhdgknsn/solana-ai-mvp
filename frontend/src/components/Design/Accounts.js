import React from 'react';

const Accounts = ({ accountsData = [], handleFieldChange, handleSubmit, handleKeyPress }) => {
  return (
    <div>
      <h2>Accounts</h2>
      {accountsData.length > 0 ? (
        accountsData.map((account, index) => (
          <div key={index}>
            <div className='form-inner-section'>
              <label>Account Type:</label>
              <input
                type="text"
                value={account.accountType}
                onChange={(e) => handleFieldChange('accounts', 'accountsData', index, 'accountType', e.target.value)}
              />
              <button type='submit' onClick={() => handleSubmit('accounts', 'accountsData', index, 'accountType', account.accountType)}>
                ➔
              </button>
            </div>
            <div className='form-inner-section'>
              <label>Public Key:</label>
              <input
                type="text"
                value={account.publicKey}
                onChange={(e) => handleFieldChange('accounts', 'accountsData', index, 'publicKey', e.target.value)}
              />
              <button type='submit' onClick={() => handleSubmit('accounts', 'accountsData', index, 'publicKey', account.publicKey)}>
                ➔
              </button>
            </div>
            <div className='form-inner-section'>
              <label>Private Key:</label>
              <input
                type="text"
                value={account.privateKey}
                onChange={(e) => handleFieldChange('accounts', 'accountsData', index, 'privateKey', e.target.value)}
              />
              <button type='submit' onClick={() => handleSubmit('accounts', 'accountsData', index, 'privateKey', account.privateKey)}>
                ➔
              </button>
            </div>
            <div className='form-inner-section'>
              <label>Owner:</label>
              <input
                type="text"
                value={account.owner}
                onChange={(e) => handleFieldChange('accounts', 'accountsData', index, 'owner', e.target.value)}
              />
              <button type='submit' onClick={() => handleSubmit('accounts', 'accountsData', index, 'owner', account.owner)}>
                ➔
              </button>
            </div>
            <div className='form-inner-section'>
              <label>Balance:</label>
              <input
                type="text"
                value={account.balance}
                onChange={(e) => handleFieldChange('accounts', 'accountsData', index, 'balance', e.target.value)}
              />
              <button type='submit' onClick={() => handleSubmit('accounts', 'accountsData', index, 'balance', account.balance)}>
                ➔
              </button>
            </div>
            <div className='form-inner-section'>
              <label>Permissions:</label>
              <input
                type="text"
                value={account.permissions.join(', ')} // Display as comma-separated string
                onChange={(e) => handleFieldChange('accounts', 'accountsData', index, 'permissions', e.target.value.split(', '))}
              />
              <button type='submit' onClick={() => handleSubmit('accounts', 'accountsData', index, 'permissions', account.permissions)}>
                ➔
              </button>
            </div>
            <div className='form-inner-section'>
              <label>Metadata (Created At):</label>
              <input
                type="text"
                value={account.metadata.createdAt}
                onChange={(e) => handleFieldChange('accounts', 'accountsData', index, 'metadata.createdAt', e.target.value)}
              />
              <button type='submit' onClick={() => handleSubmit('accounts', 'accountsData', index, 'metadata.createdAt', account.metadata.createdAt)}>
                ➔
              </button>
            </div>
            <div className='form-inner-section'>
              <label>Metadata (Updated At):</label>
              <input
                type="text"
                value={account.metadata.updatedAt}
                onChange={(e) => handleFieldChange('accounts', 'accountsData', index, 'metadata.updatedAt', e.target.value)}
              />
              <button type='submit' onClick={() => handleSubmit('accounts', 'accountsData', index, 'metadata.updatedAt', account.metadata.updatedAt)}>
                ➔
              </button>
            </div>
            <div className='form-inner-section'>
              <label>Security (Encryption):</label>
              <input
                type="text"
                value={account.security.encryption}
                onChange={(e) => handleFieldChange('accounts', 'accountsData', index, 'security.encryption', e.target.value)}
              />
              <button type='submit' onClick={() => handleSubmit('accounts', 'accountsData', index, 'security.encryption', account.security.encryption)}>
                ➔
              </button>
            </div>
            <div className='form-inner-section'>
              <label>Security (MultiSig):</label>
              <input
                type="checkbox"
                checked={account.security.multiSig}
                onChange={(e) => handleFieldChange('accounts', 'accountsData', index, 'security.multiSig', e.target.checked)}
              />
              <button type='submit' onClick={() => handleSubmit('accounts', 'accountsData', index, 'security.multiSig', account.security.multiSig)}>
                ➔
              </button>
            </div>
            <div className='form-inner-section'>
              <label>Security (Authorized Users):</label>
              <input
                type="text"
                value={account.security.authorizedUsers.join(', ')} // Display as comma-separated string
                onChange={(e) => handleFieldChange('accounts', 'accountsData', index, 'security.authorizedUsers', e.target.value.split(', '))}
              />
              <button type='submit' onClick={() => handleSubmit('accounts', 'accountsData', index, 'security.authorizedUsers', account.security.authorizedUsers)}>
                ➔
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No Accounts Available</p>
      )}
    </div>
  );
};

export default Accounts;
