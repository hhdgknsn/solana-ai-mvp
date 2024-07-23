import React from 'react';

const SecurityForm = ({ security, handleFieldChange }) => {
  return (
    <div className="section">
      <div className="section-content">
        <textarea
          value={security.measures}
          onChange={(e) => handleFieldChange('security', 'measures', e.target.value)}
          placeholder="Security Measures"
        />
      </div>
    </div>
  );
};

export default SecurityForm;
