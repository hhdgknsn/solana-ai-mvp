import React, { useEffect, useState } from 'react';
import OverallForm from './components/OverallForm.js';
import axios from 'axios';
import './styles/AccountDesign.css';

const AccountDesign = () => {
  const [formData, setFormData] = useState({
    general: {
      project_name: "",
      mvp_description: "",
      user_description: ""
    },
    account_design: {
      user_accounts: [],
      program_accounts: []
    },
    functions: [],
    security: {
      measures: []
    },
    permissions: {
      roles: []
    },
    integration_points: {
      external_apis: []
    },
    validation_rules: {
      rules: []
    },
    test_cases: {
      cases: []
    },
    error_handling: {
      error_codes: []
    },
    test_env_config: {
      platform: "",
      dependencies: [],
      setup_instructions: ""
    }
  });

  const [savedDesign, setSavedDesign] = useState({});
  const [defaultMessage, setDefaultMessage] = useState('');
  const [fetchError, setFetchError] = useState('');

  const fetchMvpInfo = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/get-mvp-info');
      setFormData(response.data);
      setSavedDesign(response.data);
    } catch (error) {
      setFetchError('Error fetching MVP info: ' + error.message);
    }
  };

  const handleFieldChange = (section, index, field, value) => {
    setFormData(prevState => {
      const updatedSection = { ...prevState[section] };
      if (index !== undefined && index !== null) {
        updatedSection[index] = {
          ...updatedSection[index],
          [field]: value,
        };
      } else {
        updatedSection[field] = value;
      }
      return { ...prevState, [section]: updatedSection };
    });
  };

  const handleSubmit = async (section, index, field, value) => {
    try {
      const response = await axios.post('http://localhost:8000/api/update-field', { section, field, value });
      await fetchMvpInfo(); // Fetch updated data
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const addField = (sectionPath, newField) => {
    setFormData(prevState => {
      const sections = sectionPath.split('.');
      const lastSection = sections.pop();
      const updatedSection = { ...prevState };

      let current = updatedSection;
      for (const section of sections) {
        if (!current[section]) {
          current[section] = {};
        }
        current = current[section];
      }

      if (Array.isArray(current[lastSection])) {
        current[lastSection] = [...current[lastSection], newField];
      } else {
        current[lastSection] = [newField];
      }

      return updatedSection;
    });
  };

  const addNestedField = (section, index, field, newField) => {
    setFormData(prevState => {
      const updatedSection = { ...prevState };
      if (!Array.isArray(updatedSection[section][index][field])) {
        updatedSection[section][index][field] = [];
      }
      updatedSection[section][index][field] = [...updatedSection[section][index][field], newField];
      return updatedSection;
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/save', formData);
      setSavedDesign(response.data);
      setDefaultMessage(response.data.message || '');
    } catch (error) {
      alert('Error saving design: ' + error.message);
    }
  };

  useEffect(() => {
    fetchMvpInfo();
  }, []);

  return (
    <div className="account-design-container">
      <h2>Account Design & Use Cases</h2>
      <div className="account-design-container-inner">
        {fetchError && <p style={{ color: 'red' }}>{fetchError}</p>}
        <form onSubmit={handleFormSubmit}>
          <OverallForm
            formData={formData}
            handleFieldChange={handleFieldChange}
            handleSubmit={handleSubmit}
            addField={addField}
            addNestedField={addNestedField}
          />
          <button type="submit">Save</button>
        </form>
        {defaultMessage && <p>{defaultMessage}</p>}
        <div className="design-overview">
          <h2>Account Design Overview</h2>
          <pre>{JSON.stringify(savedDesign, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default AccountDesign;
