import React from 'react';

const TestEnvConfigForm = ({ test_env_config, handleFieldChange }) => {
  return (
    <div className="section">
      <h2>Test Environment Configuration</h2>
      <div className="section-content">
        <input
          type="text"
          value={test_env_config.platform}
          onChange={(e) => handleFieldChange('test_env_config', 'platform', e.target.value)}
          placeholder="Platform"
        />
        <textarea
          value={test_env_config.dependencies.join(', ')}
          onChange={(e) => handleFieldChange('test_env_config', 'dependencies', e.target.value.split(', '))}
          placeholder="Dependencies (comma-separated)"
        />
        <textarea
          value={test_env_config.setup_instructions}
          onChange={(e) => handleFieldChange('test_env_config', 'setup_instructions', e.target.value)}
          placeholder="Setup Instructions"
        />
      </div>
    </div>
  );
};

export default TestEnvConfigForm;
