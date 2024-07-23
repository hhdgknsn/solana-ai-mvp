import React from 'react';

const IntegrationPointsForm = ({ integration_points, handleNestedFieldChange, addNestedField }) => {
  return (
    <div className="section">
      <div className="section-content">
        {integration_points.external_apis.map((api, apiIndex) => (
          <div key={apiIndex}>
            <input
              type="text"
              value={api.name}
              onChange={(e) => handleNestedFieldChange('integration_points.external_apis', apiIndex, 'name', e.target.value)}
              placeholder="API Name"
            />
            <textarea
              value={api.description}
              onChange={(e) => handleNestedFieldChange('integration_points.external_apis', apiIndex, 'description', e.target.value)}
              placeholder="API Description"
            />
          </div>
        ))}
        <button type="button" onClick={() => addNestedField('integration_points.external_apis', { name: "", description: "" })}>
          Add API
        </button>
      </div>
    </div>
  );
};

export default IntegrationPointsForm;
