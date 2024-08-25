import React from 'react';

const Instructions = ({ instructions, handleFieldChange, handleSubmit, handleKeyPress, addField, addNestedField }) => {

  const handleInstructionChange = (index, field) => (e) => {
    handleFieldChange('instructions', null, index, field, e.target.value);
  };

  return (
    <div>
      {instructions.map((instruction, index) => (
        <div key={index} className='form-inner-section'>
          <label>Instruction Name:</label>
          <input
            type="text"
            value={instruction.name}
            onChange={handleInstructionChange(index, 'name')}
          />
          <button onClick={() => handleSubmit('instructions', index, 'name', instruction.name)} style={{border: 'none', background: 'none'}}>
            ➔
          </button>

          <label>Description:</label>
          <input
            type="text"
            value={instruction.description}
            onChange={handleInstructionChange(index, 'description')}
          />
          <button onClick={() => handleSubmit('instructions', index, 'description', instruction.description)} style={{border: 'none', background: 'none'}}>
            ➔
          </button>

          {/* Add other fields similarly */}
        </div>
      ))}
      <button onClick={() => addField('instructions', { name: '', description: '', parameters: [], expectedOutput: '', errorHandling: { errorCode: '', errorMessage: '' }, security: { requiresAuthorization: false, authorizedRoles: [] }, integrationPoints: { externalAPIs: [], linkedContracts: [] }, executionSettings: { gasLimit: '', timeout: '', retryOnFailure: false } })}>
        Add New Instruction
      </button>
    </div>
  );
};

export default Instructions;
