import React from 'react';

const ErrorHandlingForm = ({ error_handling, handleNestedFieldChange, addNestedField }) => {
  return (
    <div className="section">
      <h2>Error Handling</h2>
      <div className="section-content">
        {error_handling.error_codes.map((errorCode, errorCodeIndex) => (
          <div key={errorCodeIndex}>
            <input
              type="number"
              value={errorCode.code}
              onChange={(e) => handleNestedFieldChange('error_handling.error_codes', errorCodeIndex, 'code', e.target.value)}
              placeholder="Error Code"
            />
            <textarea
              value={errorCode.message}
              onChange={(e) => handleNestedFieldChange('error_handling.error_codes', errorCodeIndex, 'message', e.target.value)}
              placeholder="Error Message"
            />
          </div>
        ))}
        <button type="button" onClick={() => addNestedField('error_handling.error_codes', { code: 0, message: "" })}>
          Add Error Code
        </button>
      </div>
    </div>
  );
};

export default ErrorHandlingForm;
