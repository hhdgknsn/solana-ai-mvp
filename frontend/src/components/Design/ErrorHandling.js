import React from 'react';

const ErrorHandling = ({ errorHandling, handleFieldChange, handleSubmit, handleKeyPress }) => {

  const handleChange = (field) => (e) => {
    handleFieldChange('errorHandling', null, null, field, e.target.value);
  };

  return (
    <div className='form-inner-section'>
      <label>Global Error Codes:</label>
      <input
        type="text"
        value={errorHandling.globalErrorCodes.join(', ')}
        onChange={(e) => handleFieldChange('errorHandling', null, null, 'globalErrorCodes', e.target.value.split(', '))}
      />
      <button onClick={() => handleSubmit('errorHandling', null, 'globalErrorCodes', errorHandling.globalErrorCodes)} style={{border: 'none', background: 'none'}}>
        ➔
      </button>

      <label>Fallback Instructions:</label>
      <input
        type="text"
        value={errorHandling.fallbackInstructions.join(', ')}
        onChange={(e) => handleFieldChange('errorHandling', null, null, 'fallbackInstructions', e.target.value.split(', '))}
      />
      <button onClick={() => handleSubmit('errorHandling', null, 'fallbackInstructions', errorHandling.fallbackInstructions)} style={{border: 'none', background: 'none'}}>
        ➔
      </button>

      <label>Enable Logging:</label>
      <input
        type="checkbox"
        checked={errorHandling.loggingSettings.enableLogging}
        onChange={(e) => handleFieldChange('errorHandling', 'loggingSettings', null, 'enableLogging', e.target.checked)}
      />
      <button onClick={() => handleSubmit('errorHandling', null, 'loggingSettings.enableLogging', errorHandling.loggingSettings.enableLogging)} style={{border: 'none', background: 'none'}}>
        ➔
      </button>

      {/* Add other fields similarly */}
    </div>
  );
};

export default ErrorHandling;
