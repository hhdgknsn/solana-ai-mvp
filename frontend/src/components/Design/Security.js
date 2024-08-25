import React from 'react';

const Security = ({ securityRequirements, handleFieldChange, handleSubmit, handleKeyPress }) => {

  const handleChange = (field) => (e) => {
    handleFieldChange('securityRequirements', null, null, field, e.target.value);
  };

  return (
    <div className='form-inner-section'>
      <label>Encryption Standards:</label>
      <input
        type="text"
        value={securityRequirements.encryptionStandards}
        onChange={handleChange('encryptionStandards')}
      />
      <button onClick={() => handleSubmit('securityRequirements', null, 'encryptionStandards', securityRequirements.encryptionStandards)} style={{border: 'none', background: 'none'}}>
        ➔
      </button>

      <label>Multi-Factor Authentication:</label>
      <input
        type="checkbox"
        checked={securityRequirements.multiFactorAuthentication}
        onChange={(e) => handleFieldChange('securityRequirements', null, null, 'multiFactorAuthentication', e.target.checked)}
      />
      <button onClick={() => handleSubmit('securityRequirements', null, 'multiFactorAuthentication', securityRequirements.multiFactorAuthentication)} style={{border: 'none', background: 'none'}}>
        ➔
      </button>

      {/* Add other fields similarly */}
    </div>
  );
};

export default Security;
