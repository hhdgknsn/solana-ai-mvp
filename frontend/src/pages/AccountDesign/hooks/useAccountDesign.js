import { useState, useEffect } from 'react';
import axios from 'axios';

const useAccountDesign = () => {
  const [userAccounts, setUserAccounts] = useState([]);
  const [programAccounts, setProgramAccounts] = useState([]);
  const [savedDesign, setSavedDesign] = useState(null);
  const [defaultMessage, setDefaultMessage] = useState('');

  useEffect(() => {
    const fetchInitialDesign = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/get-design');
        const design = response.data;
        setSavedDesign(design);
        setUserAccounts(design.user_accounts || []);
        setProgramAccounts(design.program_accounts || []);
      } catch (error) {
        console.error('Error fetching design:', error);
      }
    };

    fetchInitialDesign();
  }, []);

  const handleFieldChange = (setter, index, field, value) => {
    setter(prevState => {
      const newState = [...prevState];
      newState[index][field] = value;
      return newState;
    });
  };

  const handleNestedFieldChange = (setter, parentIndex, field, childIndex, key, value) => {
    setter(prevState => {
      const newState = [...prevState];
      newState[parentIndex][field][childIndex][key] = value;
      return newState;
    });
  };

  const addField = (setter, initial) => {
    setter(prevState => [...prevState, initial]);
  };

  const addNestedField = (setter, parentIndex, field, initial) => {
    setter(prevState => {
      const newState = [...prevState];
      newState[parentIndex][field].push(initial);
      return newState;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const design = {
      user_accounts: userAccounts,
      program_accounts: programAccounts
    };

    try {
      const response = await axios.post('http://localhost:8000/api/save', design);
      setSavedDesign(response.data.design);
      setDefaultMessage(response.data.message || '');

      const overviewResponse = await axios.post('http://localhost:8000/api/generate', design);
      setSavedDesign((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          generatedOverview: overviewResponse.data.generated_text,
        };
      });
    } catch (error) {
      console.error('Error saving design:', error);
    }
  };

  return {
    userAccounts,
    programAccounts,
    savedDesign,
    defaultMessage,
    setUserAccounts,
    setProgramAccounts,
    handleFieldChange,
    handleNestedFieldChange,
    addField,
    addNestedField,
    handleSubmit,
  };
};

export default useAccountDesign;
