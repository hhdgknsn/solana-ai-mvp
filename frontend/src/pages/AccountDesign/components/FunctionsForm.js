import React from 'react';

const FunctionsForm = ({ functions, handleNestedFieldChange, addNestedField }) => {
  return (
    <div className="section">
      <div className="section-content">
        {functions.map((func, funcIndex) => (
          <div key={funcIndex}>
            <input
              type="text"
              value={func.name}
              onChange={(e) => handleNestedFieldChange('functions', funcIndex, 'name', e.target.value)}
              placeholder="Function Name"
            />
            <textarea
              value={func.description}
              onChange={(e) => handleNestedFieldChange('functions', funcIndex, 'description', e.target.value)}
              placeholder="Function Description"
            />
            <input
              type="text"
              value={func.params}
              onChange={(e) => handleNestedFieldChange('functions', funcIndex, 'params', e.target.value)}
              placeholder="Parameters"
            />
            <textarea
              value={func.expected_output}
              onChange={(e) => handleNestedFieldChange('functions', funcIndex, 'expected_output', e.target.value)}
              placeholder="Expected Output"
            />
          </div>
        ))}
        <button type="button" onClick={() => addNestedField('functions', { name: "", description: "", params: {}, expected_output: "" })}>
          Add Function
        </button>
      </div>
    </div>
  );
};

export default FunctionsForm;
