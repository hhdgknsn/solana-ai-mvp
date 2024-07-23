import React from 'react';

const GeneralForm = ({ general, handleFieldChange, handleSubmit, handleKeyPress }) => {

  const handleChange = (field) => (e) => {
    handleFieldChange('general', null, null, field, e.target.value);
  };

  return (
    <div>
      <div className='form-inner-section'>
        <label>Project Name:</label>
        <input
          type="text"
          value={general.project_name}
          onChange={handleChange('project_name')}
        />
        <button onClick={() => handleSubmit('general', null, 'project_name', general.project_name)} style={{border: 'none', background: 'none'}}>
          ➔
        </button>
      </div>
      <div className='form-inner-section'>
        <label>MVP Description:</label>
        <input
          type="text"
          value={general.mvp_description}
          onChange={handleChange('mvp_description')}
        />
        <button onClick={() => handleSubmit('general', null, 'mvp_description', general.mvp_description)} style={{border: 'none', background: 'none'}}>
          ➔
        </button>
      </div>
      <div className='form-inner-section'>
        <label>User Description:</label>
        <input
          type="text"
          value={general.user_description}
          onChange={handleChange('user_description')}
          onKeyPress={handleKeyPress('general', null, 'user_description', general.user_description)}
        />
        <button onClick={() => handleSubmit('general', null, 'user_description', general.user_description)} style={{border: 'none', background: 'none'}}>
          ➔
        </button>
      </div>
    </div>
  );
};

export default GeneralForm;
