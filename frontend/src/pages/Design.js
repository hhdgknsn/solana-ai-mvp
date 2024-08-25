import React, { useEffect, useState } from 'react';
import OverallForm from '../components/Design/OverallForm.js';
import Accounts from '../components/Design/Accounts.js'; // Updated import
import axios from 'axios';
import '../styles/Design.css';

const Design = () => {
  const [formData, setFormData] = useState({
    general: {
      projectName: "",
      mvpDescription: "",
      userDescription: ""
    },
    roles: [
      {
        roleName: "",
        permissions: [],
        description: ""
      }
    ],
    accounts: { 
      accountsData: [
        {
          accountType: "",
          publicKey: "",
          privateKey: "",
          owner: "",
          balance: 0,
          permissions: [],
          metadata: {
            createdAt: "",
            updatedAt: ""
          },
          security: {
            encryption: "",
            multiSig: false,
            authorizedUsers: []
          }
        }
      ]
    },
    instructions: [
      {
        name: "",
        description: "",
        parameters: [
          {
            paramName: "",
            type: "",
            defaultValue: "",
            validationRules: {
              required: false,
              minLength: 0,
              maxLength: 0,
              minValue: 0,
              maxValue: 0
            }
          }
        ],
        expectedOutput: "",
        errorHandling: {
          errorCode: "",
          errorMessage: ""
        },
        security: {
          requiresAuthorization: false,
          authorizedRoles: []
        },
        integrationPoints: {
          externalAPIs: [],
          linkedContracts: [],
        },
        executionSettings: {
          gasLimit: "",
          timeout: "",
          retryOnFailure: false
        }
      }
    ],
    errorHandling: {
      globalErrorCodes: [],
      fallbackInstructions: [],
      loggingSettings: {
        enableLogging: false,
        logLevel: "error",
        logDestination: ""
      }
    },
    securityRequirements: {
      encryptionStandards: "",
      multiFactorAuthentication: false,
      authorizedNetworks: [],
      dataRetentionPolicy: {
        retentionPeriod: "",
        backupFrequency: "",
      },
      accessControl: {
        rolesWithAccess: [],
        ipWhitelist: []
      }
    },
    integrationPoints: {
      externalServices: [],
      oracleServices: [],
      thirdPartyAPIs: []
    }
  });

  const [savedDesign, setSavedDesign] = useState({});
  const [defaultMessage, setDefaultMessage] = useState('');
  const [fetchError, setFetchError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchMvpInfo = async () => {
    setLoading(true);
    try {
      // Make an API call to the new endpoint
      const response = await axios.get('http://localhost:8000/api/get-json/mvp-design/mvp-example2');
      setFormData(response.data);
      setSavedDesign(response.data);
    } catch (error) {
      setFetchError('Error fetching MVP info: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (section, property = null, index, field, value) => {
    setFormData(prevState => {
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
    <div className="design-page">
      <h1>Design Your Application</h1>
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
          <Accounts
            accountsData={formData.accounts?.accountsData || []}
            handleFieldChange={handleFieldChange}
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
      {/* Future: Add drag-and-drop interface here */}
    </div>
  );
};

export default Design;
