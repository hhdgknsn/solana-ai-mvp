import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faSyncAlt, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import image from './res/overview.jpg';

function App() {
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [regenerateLoading, setRegenerateLoading] = useState(false);
  const [deployLoading, setDeployLoading] = useState(false);

  const [roles, setRoles] = useState([{ name: '', permissions: [] }]);
  const [entities, setEntities] = useState([{ name: '', roles: [] }]);
  const [accountDesign, setAccountDesign] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const design = {
      prompt,
      roles,
      entities
    };

    try {
      await axios.post('http://localhost:8000/api/save', design);
      const response = await axios.post('http://localhost:8000/api/generate', { prompt });
      setGeneratedText(response.data.generated_text);
      setAccountDesign(design);
    } catch (error) {
      setError('Error generating or saving text: ' + error.message);
      console.error('Error generating or saving text:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async () => {
    setRegenerateLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/regenerate', { prompt });
      setGeneratedText(response.data.generated_text);
    } catch (error) {
      console.error('Error regenerating text:', error);
    } finally {
      setRegenerateLoading(false);
    }
  };

  const handleDeploy = async () => {
    setDeployLoading(true);
    try {
      await axios.post('http://localhost:8000/api/deploy', { prompt });
      console.log('Deployed successfully');
    } catch (error) {
      console.error('Error deploying:', error);
    } finally {
      setDeployLoading(false);
    }
  };

  const addRole = () => {
    setRoles([...roles, { name: '', permissions: [] }]);
  };

  const addEntity = () => {
    setEntities([...entities, { name: '', roles: [] }]);
  };

  const handleRoleChange = (index, event) => {
    const newRoles = roles.slice();
    newRoles[index].name = event.target.value;
    setRoles(newRoles);
  };

  const handleEntityChange = (index, event) => {
    const newEntities = entities.slice();
    newEntities[index].name = event.target.value;
    setEntities(newEntities);
  };

  const handleSave = async () => {
    const design = {
      prompt,
      roles,
      entities
    };

    try {
      await axios.post('http://localhost:8000/api/save', design);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      setAccountDesign(design);
    } catch (error) {
      console.error('Error saving account design:', error);
    }
  };

  const renderAccountSummary = (design) => (
    <div className="summary-content">
      <h2>Account Design Overview</h2>
      <ul>
        <li>
          <strong>Roles:</strong>
          <ul>
            {design.roles.map((role, index) => (
              <li key={index}>
                {role.name}
              </li>
            ))}
          </ul>
        </li>
        <li>
          <strong>Entities:</strong>
          <ul>
            {design.entities.map((entity, index) => (
              <li key={index}>
                {entity.name}
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );

  return (
    <div className="container">
      <div className="input-section">
        <h1>Account Design</h1>
        <form onSubmit={handleSubmit}>
          <div className="textarea-container">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Input a prompt to generate code"
            />
            <div className="button-container">
              <button type="submit" className="generate-button">
                <FontAwesomeIcon icon={faArrowUp} />
              </button>
              {loading && <div className="loader"></div>}
            </div>
          </div>
          {error && <p className="error">{error}</p>}
          <div className="account-design-dropdowns">
            <div className="roles-section">
              <h2>Roles and Permissions</h2>
              {roles.map((role, index) => (
                <div key={index} className="role-input">
                  <label>Role Name:</label>
                  <input type="text" value={role.name} onChange={(e) => handleRoleChange(index, e)} />
                </div>
              ))}
              <button type="button" className="action-button" onClick={addRole}>Add More Roles</button>
            </div>
            <div className="entities-section">
              <h2>Entities and Relationships</h2>
              {entities.map((entity, index) => (
                <div key={index} className="entity-input">
                  <label>Entity Name:</label>
                  <input type="text" value={entity.name} onChange={(e) => handleEntityChange(index, e)} />
                </div>
              ))}
              <button type="button" className="action-button" onClick={addEntity}>Add More Entities</button>
            </div>
            <button type="button" className="save-button" onClick={handleSave}>Submit</button>
          </div>
        </form>
      </div>
      <div className="output-sections">
        <div className="summary-image-container">
          {accountDesign && (
            <>
              <img src={image} alt="description" className="input-image" />
              <div className="summary-section">
                {renderAccountSummary(accountDesign)}
              </div>
            </>
          )}
        </div>
        <div className="section">
          <h2>On-Chain Solana Program</h2>
          <div className="output-box">
            <h3>Rust</h3>
            <pre>{generatedText}</pre>
            <div className="download-icon">
              <FontAwesomeIcon icon={faDownload} />
            </div>
          </div>
          <div className="output-box">
            <h3>Test cases</h3>
            <pre>{generatedText}</pre>
            <div className="download-icon">
              <FontAwesomeIcon icon={faDownload} />
            </div>
          </div>
          <div className="bottom-buttons">
            <button onClick={handleRegenerate} className="action-button">
              <FontAwesomeIcon icon={faSyncAlt} />
              {regenerateLoading && <div className="small-loader"></div>}
            </button>
            <button onClick={handleDeploy} className="action-button">
              Deploy and Test
              {deployLoading && <div className="small-loader"></div>}
            </button>
          </div>
        </div>
        <div className="section">
          <h2>Front-End UI</h2>
          <div className="output-box">
            <h3>HTML</h3>
            <pre>{generatedText}</pre>
            <div className="download-icon">
              <FontAwesomeIcon icon={faDownload} />
            </div>
          </div>
          <div className="output-box">
            <h3>CSS</h3>
            <pre>{generatedText}</pre>
            <div className="download-icon">
              <FontAwesomeIcon icon={faDownload} />
            </div>
          </div>
          <div className="output-box">
            <h3>Javascript</h3>
            <pre>{generatedText}</pre>
            <div className="download-icon">
              <FontAwesomeIcon icon={faDownload} />
            </div>
          </div>
        </div>
      </div>
      {showAlert && (
        <div className="custom-alert">
          <p>Account design saved successfully</p>
          <button onClick={() => setShowAlert(false)}>OK</button>
        </div>
      )}
    </div>
  );
}

export default App;
