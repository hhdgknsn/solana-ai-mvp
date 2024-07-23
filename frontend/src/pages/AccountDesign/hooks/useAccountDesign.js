import { useState, useEffect } from 'react';
import axios from 'axios';

const useAccountDesign = () => {
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

  const fetchMvpInfo = async () => {
    try {
      const response = await axios.get('/api/get-mvp-info');
      console.log('Fetched MVP info:', response.data);
      setFormData(response.data);
      setSavedDesign(response.data);
    } catch (error) {
      console.error('Error fetching MVP info:', error);
    }
  };

  const handleFieldChange = (section, field, value) => {
    setFormData(prevState => {
      let updatedSection = { ...prevState[section], [field]: value };
      return { ...prevState, [section]: updatedSection };
    });
  };

  const handleSubmit = async (section, field, value) => {
    console.log(`Submitting to /api/update-field: section=${section}, field=${field}, value=${value}`);
    try {
      const response = await axios.post('/api/update-field', { section, field, value });
      console.log('Response from /api/update-field:', response.data);
      await fetchMvpInfo(); // Fetch updated data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addField = (section, newField) => {
    setFormData(prevState => {
      let updatedSection = { ...prevState };
      updatedSection[section] = [...prevState[section], newField];
      return updatedSection;
    });
  };

  const addNestedField = (section, index, field, newField) => {
    setFormData(prevState => {
      let updatedSection = { ...prevState };
      updatedSection[section][index][field] = [...prevState[section][index][field], newField];
      return updatedSection;
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/save', formData);
      setSavedDesign(response.data);
      setDefaultMessage(response.data.message || '');
    } catch (error) {
      console.error('Error saving design:', error);
    }
  };

  useEffect(() => {
    fetchMvpInfo();
  }, []);

  return {
    formData,
    fetchMvpInfo,
    handleFieldChange,
    handleSubmit,
    addField,
    addNestedField,
    handleFormSubmit,
    defaultMessage,
    savedDesign
  };
};

export default useAccountDesign;
