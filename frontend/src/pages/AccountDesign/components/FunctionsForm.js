import React from 'react';

const Functions = ({ functions, handleFieldChange, handleSubmit, handleKeyPress }) => {
  return (
    <div>
      {functions.map((func, index) => (
        <div key={index}>
            <div className='form-inner-section'>
                <label>Name:</label>
                <input
                    type="text"
                    value={functions.name}
                    onChange={(e) => handleFieldChange('functions', 'null', index, 'name', e.target.value)}
                />
                <button type='submit' onClick={() => handleSubmit('functions', index, 'name', func.name)}>
                    ➔
                </button>
            </div>
            <div className='form-inner-section'>
                <label>Description:</label>
                <input
                    type="text"
                    value={functions.description}
                    onChange={(e) => handleFieldChange('functions', 'null', index, 'description', e.target.value)}
                />
                <button type='submit' onClick={() => handleSubmit('functions', index, 'description', func.description)}>
                    ➔
                </button>
            </div>
            <div className='form-inner-section'>
                <label>Parameters:</label>
                <input
                    type="text"
                    value={functions.parameters}
                    onChange={(e) => handleFieldChange('functions', 'null', index, 'parameters', e.target.value)}
                />
                <button type='submit' onClick={() => handleSubmit('functions', index, 'parameters', func.parameters)}>
                    ➔
                </button>
            </div>
            <div className='form-inner-section'>
                <label>Expected Output:</label>
                <input
                    type="text"
                    value={functions.expected_output}
                    onChange={(e) => handleFieldChange('functions', 'null', index, 'expected_output', e.target.value)}
                />
                <button type='submit' onClick={() => handleSubmit('functions', index, 'expected_output', func.expected_output)}>
                    ➔
                </button>
            </div>
            
        </div>
      ))}
    </div>
  );
};

export default Functions;
