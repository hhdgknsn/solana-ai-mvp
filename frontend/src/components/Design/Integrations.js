import React from 'react';

const Integrations = ({ integrationPoints, handleFieldChange, handleSubmit, handleKeyPress, addField, addNestedField }) => {

  const handleIntegrationPointChange = (field) => (e) => {
    handleFieldChange('integrationPoints', null, null, field, e.target.value);
  };

  return (
    <div className='form-inner-section'>
      <label>External Services:</label>
      <input
        type="text"
        value={integrationPoints.externalServices.join(', ')}
        onChange={(e) => handleFieldChange('integrationPoints', null, null, 'externalServices', e.target.value.split(', '))}
      />
      <button onClick={() => handleSubmit('integrationPoints', null, 'externalServices', integrationPoints.externalServices)} style={{border: 'none', background: 'none'}}>
        ➔
      </button>

      <label>Oracle Services:</label>
      <input
        type="text"
        value={integrationPoints.oracleServices.join(', ')}
        onChange={(e) => handleFieldChange('integrationPoints', null, null, 'oracleServices', e.target.value.split(', '))}
      />
      <button onClick={() => handleSubmit('integrationPoints', null, 'oracleServices', integrationPoints.oracleServices)} style={{border: 'none', background: 'none'}}>
        ➔
      </button>

      {/* Add other fields similarly */}
    </div>
  );
};

export default Integrations;
