import React from 'react';

const GeneralForm = ({ general, handleFieldChange }) => {
  return (
    <div className="section">
      <h2>General</h2>
      <div className="section-content">
        <input
          type="text"
          value={general.project_name}
          onChange={(e) => handleFieldChange('general', 'project_name', e.target.value)}
          placeholder="Project Name"
        />
        <textarea
          value={general.mvp_description}
          onChange={(e) => handleFieldChange('general', 'mvp_description', e.target.value)}
          placeholder="MVP Description"
        />
        <textarea
          value={general.user_description}
          onChange={(e) => handleFieldChange('general', 'user_description', e.target.value)}
          placeholder="User Description"
        />
      </div>
    </div>
  );
};

export default GeneralForm;
