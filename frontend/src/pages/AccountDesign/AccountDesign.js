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
      user_accounts: [
        {
          "account_type": "",
          "public_key": "",
          "private_key": "",
          "owner": "",
          "balance": "",
          "permissions": ""
        }
      ],
      program_acconts: [
        {
          "account_type": "",
          "public_key": "",
          "owner": "",
          "name": "",
          "permissions": "",
          "settings": ""
        }
      ],
      functions: [
        {
          "name": "", 
          "description": "",
          "parameters": {},
          "expected_output": ""
        }
      ]
    }
  });

  const [savedDesign, setSavedDesign] = useState({});
  const [defaultMessage, setDefaultMessage] = useState('');
  const [fetchError, setFetchError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchMvpInfo = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/get-mvp-info');
      setFormData(response.data);
      setSavedDesign(response.data);
    } catch (error) {
      setFetchError('Error fetching MVP info: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (section, property=null, index, field, value) => {
    setFormData(prevState => {
      // Handle case where section itself is an array
      if (Array.isArray(prevState[section])) {
        const updatedArray = [...prevState[section]];
        if (index !== undefined && index !== null) {
          updatedArray[index] = {
            ...updatedArray[index],
            [field]: value,
          };
        }
        return { ...prevState, [section]: updatedArray };
      }
  
      // Handle case where section is an object containing an array property
      const updatedSection = { ...prevState[section] };
      if (Array.isArray(updatedSection[property])) {
        const updatedArray = [...updatedSection[property]];
        if (index !== undefined && index !== null) {
          updatedArray[index] = {
            ...updatedArray[index],
            [field]: value,
          };
        }
        updatedSection[property] = updatedArray;
      } else {
        updatedSection[field] = value;
      }
  
      return { ...prevState, [section]: updatedSection };
    });
  };
  
  

  const handleKeyPress = (section, index, field, value) => (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(section, index, field, value);
    }
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
      <div className='account-design-container-header'>
        <h2>MVP Specifications</h2>
        <p>This page is for defining the MVP specifications, including the account design and use cases.</p>
      </div>
      <div className="account-design-container-inner">
        {loading && <p>Loading...</p>}
        {fetchError && <p style={{ color: 'red' }}>{fetchError}</p>}
        <form onSubmit={handleFormSubmit}>
          <OverallForm
            formData={formData}
            handleFieldChange={handleFieldChange}
            handleSubmit={handleSubmit}
            addField={addField}
            addNestedField={addNestedField}
            handleKeyPress={handleKeyPress}
          />
          <button type="submit">Save</button>
        </form>
        {defaultMessage && <p>{defaultMessage}</p>}
        <div className="design-overview">
          <h2>mvp-info.json:</h2>
          <pre>{JSON.stringify(savedDesign, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default AccountDesign;
