import React, { useCallback, useState, useEffect, useRef } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import axios from 'axios';
import '../styles/AccountDesign.css';

const initialNodes = [];
const initialEdges = [];

const AccountDesign = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [entities, setEntities] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const [useCases, setUseCases] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [initParams, setInitParams] = useState({});
  const [instructions, setInstructions] = useState([]);
  const [stateTransitions, setStateTransitions] = useState([]);
  const [errors, setErrors] = useState([]);
  const [security, setSecurity] = useState([]);
  const [integrationPoints, setIntegrationPoints] = useState([]);
  const [testing, setTesting] = useState([]);
  const [performanceMetrics, setPerformanceMetrics] = useState([]);
  const [developmentEnvironment, setDevelopmentEnvironment] = useState({
    tools: [],
    deployment_configuration: { network: "", account_keys: "", deployment_scripts: "" }
  });

  const [accountDesignUpdated, setAccountDesignUpdated] = useState(false);
  const [savedDesign, setSavedDesign] = useState({
    roles: [],
    entities: [],
    useCases: [],
    accounts: [],
    relationships: [],
    init_params: {},
    instructions: [],
    state_transitions: [],
    errors: [],
    security: [],
    integration_points: [],
    testing: [],
    performance_metrics: [],
    development_environment: { tools: [], deployment_configuration: { network: "", account_keys: "", deployment_scripts: "" } },
  });
  const [defaultMessage, setDefaultMessage] = useState('');

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const reactFlowWrapper = useRef(null);

  useEffect(() => {
    const fetchInitialDesign = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/get-design');
        const design = response.data;
        setSavedDesign(design);
        setRoles(design.roles || []);
        setPermissions((design.roles || []).map(() => []));
        setEntities(design.entities || []);
        setRelationships((design.entities || []).map(() => []));
        setUseCases(design.useCases || []);
        setAccounts(design.accounts || []);
        setInitParams(design.init_params || {});
        setInstructions(design.instructions || []);
        setStateTransitions(design.state_transitions || []);
        setErrors(design.errors || []);
        setSecurity(design.security || []);
        setIntegrationPoints(design.integration_points || []);
        setTesting(design.testing || []);
        setPerformanceMetrics(design.performance_metrics || []);
        setDevelopmentEnvironment(design.development_environment || {
          tools: [],
          deployment_configuration: { network: "", account_keys: "", deployment_scripts: "" }
        });
      } catch (error) {
        console.error('Error fetching design:', error);
      }
    };

    fetchInitialDesign();
  }, []);

  useEffect(() => {
    if (accountDesignUpdated) {
      const fetchUpdatedDesign = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/get-design');
          const design = response.data;
          setSavedDesign(design);
          setRoles(design.roles || []);
          setPermissions((design.roles || []).map(() => []));
          setEntities(design.entities || []);
          setRelationships((design.entities || []).map(() => []));
          setUseCases(design.useCases || []);
          setAccounts(design.accounts || []);
          setInitParams(design.init_params || {});
          setInstructions(design.instructions || []);
          setStateTransitions(design.state_transitions || []);
          setErrors(design.errors || []);
          setSecurity(design.security || []);
          setIntegrationPoints(design.integration_points || []);
          setTesting(design.testing || []);
          setPerformanceMetrics(design.performance_metrics || []);
          setDevelopmentEnvironment(design.development_environment || {
            tools: [],
            deployment_configuration: { network: "", account_keys: "", deployment_scripts: "" }
          });
        } catch (error) {
          console.error('Error fetching updated design:', error);
        }
      };

      fetchUpdatedDesign();
      setAccountDesignUpdated(false);
    }
  }, [accountDesignUpdated]);

  const updateNodes = () => {
    const newNodes = [
      ...roles.map((role, index) => ({
        id: `role-${index}`,
        type: 'input',
        position: { x: 0, y: index * 100 },
        data: { label: role },
      })),
      ...entities.map((entity, index) => ({
        id: `entity-${index}`,
        type: 'output',
        position: { x: 200, y: index * 100 },
        data: { label: entity },
      })),
    ];
    setNodes(newNodes);
  };

  const handleRoleChange = (index, event) => {
    const newRoles = roles.slice();
    newRoles[index] = event.target.value;
    setRoles(newRoles);
    updateNodes();
  };

  const handlePermissionChange = (roleIndex, permissionIndex, event) => {
    const newPermissions = permissions.slice();
    if (!newPermissions[roleIndex]) {
      newPermissions[roleIndex] = [];
    }
    newPermissions[roleIndex][permissionIndex] = event.target.value;
    setPermissions(newPermissions);
  };

  const handleEntityChange = (index, event) => {
    const newEntities = entities.slice();
    newEntities[index] = event.target.value;
    setEntities(newEntities);
    updateNodes();
  };

  const handleRelationshipChange = (entityIndex, relationshipIndex, event) => {
    const newRelationships = relationships.slice();
    if (!newRelationships[entityIndex]) {
      newRelationships[entityIndex] = [];
    }
    newRelationships[entityIndex][relationshipIndex] = event.target.value;
    setRelationships(newRelationships);
  };

  const handleUseCaseChange = (index, event) => {
    const newUseCases = useCases.slice();
    newUseCases[index] = event.target.value;
    setUseCases(newUseCases);
  };

  const handleAccountFieldChange = (accountIndex, fieldIndex, field, value) => {
    const newAccounts = accounts.slice();
    if (fieldIndex !== null) {
      newAccounts[accountIndex].fields[fieldIndex][field] = value;
    } else {
      newAccounts[accountIndex][field] = value;
    }
    setAccounts(newAccounts);
  };

  const handleInitParamChange = (accountType, paramIndex, field, value) => {
    const newInitParams = { ...initParams };
    newInitParams[accountType][paramIndex][field] = value;
    setInitParams(newInitParams);
  };

  const handleInstructionParamChange = (instructionIndex, paramIndex, field, value) => {
    const newInstructions = instructions.slice();
    newInstructions[instructionIndex].parameters[paramIndex][field] = value;
    setInstructions(newInstructions);
  };

  const handleStateTransitionChange = (transitionIndex, field, value) => {
    const newStateTransitions = stateTransitions.slice();
    newStateTransitions[transitionIndex][field] = value;
    setStateTransitions(newStateTransitions);
  };

  const handleErrorChange = (errorIndex, field, value) => {
    const newErrors = errors.slice();
    newErrors[errorIndex][field] = value;
    setErrors(newErrors);
  };

  const handleSecurityChange = (securityIndex, field, value) => {
    const newSecurity = security.slice();
    newSecurity[securityIndex][field] = value;
    setSecurity(newSecurity);
  };

  const handleIntegrationPointChange = (integrationIndex, field, value) => {
    const newIntegrationPoints = integrationPoints.slice();
    newIntegrationPoints[integrationIndex][field] = value;
    setIntegrationPoints(newIntegrationPoints);
  };

  const handleTestingChange = (testIndex, field, value) => {
    const newTesting = testing.slice();
    newTesting[testIndex][field] = value;
    setTesting(newTesting);
  };

  const handlePerformanceMetricChange = (metricIndex, field, value) => {
    const newPerformanceMetrics = performanceMetrics.slice();
    newPerformanceMetrics[metricIndex][field] = value;
    setPerformanceMetrics(newPerformanceMetrics);
  };

  const handleDevelopmentToolChange = (toolIndex, field, value) => {
    const newDevelopmentEnvironment = { ...developmentEnvironment };
    newDevelopmentEnvironment.tools[toolIndex][field] = value;
    setDevelopmentEnvironment(newDevelopmentEnvironment);
  };

  const handleDeploymentConfigChange = (field, value) => {
    const newDevelopmentEnvironment = { ...developmentEnvironment };
    newDevelopmentEnvironment.deployment_configuration[field] = value;
    setDevelopmentEnvironment(newDevelopmentEnvironment);
  };

  const addRole = () => {
    setRoles([...roles, '']);
    setPermissions([...permissions, []]);
    updateNodes();
  };

  const addPermission = (roleIndex) => {
    const newPermissions = permissions.slice();
    if (!newPermissions[roleIndex]) {
      newPermissions[roleIndex] = [];
    }
    newPermissions[roleIndex].push('');
    setPermissions(newPermissions);
  };

  const addEntity = () => {
    setEntities([...entities, '']);
    setRelationships([...relationships, []]);
    updateNodes();
  };

  const addRelationship = (entityIndex) => {
    const newRelationships = relationships.slice();
    if (!newRelationships[entityIndex]) {
      newRelationships[entityIndex] = [];
    }
    newRelationships[entityIndex].push('');
    setRelationships(newRelationships);
  };

  const addUseCase = () => {
    setUseCases([...useCases, '']);
  };

  const addAccountField = (accountIndex) => {
    const newAccounts = accounts.slice();
    newAccounts[accountIndex].fields.push({ name: "", type: "", required: false });
    setAccounts(newAccounts);
  };

  const addInitParam = (accountType) => {
    const newInitParams = { ...initParams };
    newInitParams[accountType].push({ name: "", required: false });
    setInitParams(newInitParams);
  };

  const addInstructionParam = (instructionIndex) => {
    const newInstructions = instructions.slice();
    newInstructions[instructionIndex].parameters.push({ name: "", type: "", required: false });
    setInstructions(newInstructions);
  };

  const addStateTransition = () => {
    setStateTransitions([...stateTransitions, { name: "", from: "", to: "" }]);
  };

  const addError = () => {
    setErrors([...errors, { code: 0, message: "" }]);
  };

  const addSecurityRequirement = () => {
    setSecurity([...security, { requirement: "", description: "" }]);
  };

  const addIntegrationPoint = () => {
    setIntegrationPoints([...integrationPoints, { type: "", description: "" }]);
  };

  const addTestingScenario = () => {
    setTesting([...testing, { scenario: "", description: "" }]);
  };

  const addPerformanceMetric = () => {
    setPerformanceMetrics([...performanceMetrics, { metric: "", description: "" }]);
  };

  const addDevelopmentTool = () => {
    const newDevelopmentEnvironment = { ...developmentEnvironment };
    newDevelopmentEnvironment.tools.push({ name: "", description: "" });
    setDevelopmentEnvironment(newDevelopmentEnvironment);
  };

  const deleteRole = (index) => {
    const newRoles = roles.slice();
    newRoles.splice(index, 1);
    setRoles(newRoles);

    const newPermissions = permissions.slice();
    newPermissions.splice(index, 1);
    setPermissions(newPermissions);

    updateNodes();
  };

  const deletePermission = (roleIndex, permissionIndex) => {
    const newPermissions = permissions.slice();
    newPermissions[roleIndex].splice(permissionIndex, 1);
    setPermissions(newPermissions);
  };

  const deleteEntity = (index) => {
    const newEntities = entities.slice();
    newEntities.splice(index, 1);
    setEntities(newEntities);

    const newRelationships = relationships.slice();
    newRelationships.splice(index, 1);
    setRelationships(newRelationships);

    updateNodes();
  };

  const deleteRelationship = (entityIndex, relationshipIndex) => {
    const newRelationships = relationships.slice();
    newRelationships[entityIndex].splice(relationshipIndex, 1);
    setRelationships(newRelationships);
  };

  const deleteUseCase = (index) => {
    const newUseCases = useCases.slice();
    newUseCases.splice(index, 1);
    setUseCases(newUseCases);
  };

  const deleteAccountField = (accountIndex, fieldIndex) => {
    const newAccounts = accounts.slice();
    newAccounts[accountIndex].fields.splice(fieldIndex, 1);
    setAccounts(newAccounts);
  };

  const deleteInitParam = (accountType, paramIndex) => {
    const newInitParams = { ...initParams };
    newInitParams[accountType].splice(paramIndex, 1);
    setInitParams(newInitParams);
  };

  const deleteInstructionParam = (instructionIndex, paramIndex) => {
    const newInstructions = instructions.slice();
    newInstructions[instructionIndex].parameters.splice(paramIndex, 1);
    setInstructions(newInstructions);
  };

  const deleteStateTransition = (transitionIndex) => {
    const newStateTransitions = stateTransitions.slice();
    newStateTransitions.splice(transitionIndex, 1);
    setStateTransitions(newStateTransitions);
  };

  const deleteError = (errorIndex) => {
    const newErrors = errors.slice();
    newErrors.splice(errorIndex, 1);
    setErrors(newErrors);
  };

  const deleteSecurityRequirement = (securityIndex) => {
    const newSecurity = security.slice();
    newSecurity.splice(securityIndex, 1);
    setSecurity(newSecurity);
  };

  const deleteIntegrationPoint = (integrationIndex) => {
    const newIntegrationPoints = integrationPoints.slice();
    newIntegrationPoints.splice(integrationIndex, 1);
    setIntegrationPoints(newIntegrationPoints);
  };

  const deleteTestingScenario = (testIndex) => {
    const newTesting = testing.slice();
    newTesting.splice(testIndex, 1);
    setTesting(newTesting);
  };

  const deletePerformanceMetric = (metricIndex) => {
    const newPerformanceMetrics = performanceMetrics.slice();
    newPerformanceMetrics.splice(metricIndex, 1);
    setPerformanceMetrics(newPerformanceMetrics);
  };

  const deleteDevelopmentTool = (toolIndex) => {
    const newDevelopmentEnvironment = { ...developmentEnvironment };
    newDevelopmentEnvironment.tools.splice(toolIndex, 1);
    setDevelopmentEnvironment(newDevelopmentEnvironment);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const design = {
      roles: roles.map((role, index) => ({
        name: role,
        permissions: permissions[index] || [],
      })),
      entities: entities.map((entity, index) => ({
        name: entity,
        relationships: relationships[index] || [],
      })),
      useCases,
      accounts,
      relationships,
      init_params: initParams,
      instructions,
      state_transitions: stateTransitions,
      errors,
      security,
      integration_points: integrationPoints,
      testing,
      performance_metrics: performanceMetrics,
      development_environment: developmentEnvironment,
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

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  useEffect(() => {
    if (reactFlowWrapper.current) {
      const observer = new ResizeObserver(() => {
        const event = new Event('resize');
        window.dispatchEvent(event);
      });

      observer.observe(reactFlowWrapper.current);

      return () => observer.disconnect();
    }
  }, [reactFlowWrapper]);

  return (
    <div className="account-design-container">
      <div className="account-design-container-inner">
        <h1>Account Design & Use Cases</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-div">
            <h2>Roles and Permissions</h2>
            {roles && roles.map((role, roleIndex) => (
              <div key={roleIndex}>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => handleRoleChange(roleIndex, e)}
                  placeholder="Role Name"
                />
                <button type="button" onClick={() => deleteRole(roleIndex)}>Delete Role</button>
                <div className="button-div">
                  <button type="button" onClick={() => addPermission(roleIndex)}>
                    Add Permission
                  </button>
                </div>
                {permissions[roleIndex] && permissions[roleIndex].map((permission, permissionIndex) => (
                  <div key={permissionIndex}>
                    <input
                      type="text"
                      value={permission}
                      onChange={(e) => handlePermissionChange(roleIndex, permissionIndex, e)}
                      placeholder="Permission"
                    />
                    <button type="button" onClick={() => deletePermission(roleIndex, permissionIndex)}>Delete Permission</button>
                  </div>
                ))}
              </div>
            ))}
            <button type="button" onClick={addRole}>Add More Roles</button>
          </div>
          <div className="form-div">
            <h2>Entities and Relationships</h2>
            {entities && entities.map((entity, entityIndex) => (
              <div key={entityIndex}>
                <input
                  type="text"
                  value={entity}
                  onChange={(e) => handleEntityChange(entityIndex, e)}
                  placeholder="Entity Name"
                />
                <button type="button" onClick={() => deleteEntity(entityIndex)}>Delete Entity</button>
                <div className="button-div">
                  <button type="button" onClick={() => addRelationship(entityIndex)}>
                    Add Relationship
                  </button>
                </div>
                {relationships[entityIndex] && relationships[entityIndex].map((relationship, relationshipIndex) => (
                  <div key={relationshipIndex}>
                    <input
                      type="text"
                      value={relationship}
                      onChange={(e) => handleRelationshipChange(entityIndex, relationshipIndex, e)}
                      placeholder="Relationship"
                    />
                    <button type="button" onClick={() => deleteRelationship(entityIndex, relationshipIndex)}>Delete Relationship</button>
                  </div>
                ))}
              </div>
            ))}
            <button type="button" onClick={addEntity}>Add More Entities</button>
          </div>
          <div className="form-div">
            <h2>Use Cases</h2>
            {useCases && useCases.map((useCase, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={useCase}
                  onChange={(e) => handleUseCaseChange(index, e)}
                  placeholder="Use Case"
                />
                <button type="button" onClick={() => deleteUseCase(index)}>Delete Use Case</button>
              </div>
            ))}
            <button type="button" onClick={addUseCase}>Add More Use Cases</button>
          </div>
          <div className="form-div">
            <h2>Accounts and Fields</h2>
            {accounts && accounts.map((account, accountIndex) => (
              <div key={accountIndex}>
                <input
                  type="text"
                  value={account.name}
                  onChange={(e) => handleAccountFieldChange(accountIndex, null, 'name', e.target.value)}
                  placeholder="Account Name"
                />
                <div className="button-div">
                  <button type="button" onClick={() => addAccountField(accountIndex)}>
                    Add Field
                  </button>
                </div>
                {account.fields && account.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex}>
                    <input
                      type="text"
                      value={field.name}
                      onChange={(e) => handleAccountFieldChange(accountIndex, fieldIndex, 'name', e.target.value)}
                      placeholder="Field Name"
                    />
                    <input
                      type="text"
                      value={field.type}
                      onChange={(e) => handleAccountFieldChange(accountIndex, fieldIndex, 'type', e.target.value)}
                      placeholder="Field Type"
                    />
                    <label>
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => handleAccountFieldChange(accountIndex, fieldIndex, 'required', e.target.checked)}
                      />
                      Required
                    </label>
                    <button type="button" onClick={() => deleteAccountField(accountIndex, fieldIndex)}>Delete Field</button>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="form-div">
            <h2>Initialization Parameters</h2>
            {Object.keys(initParams).map(accountType => (
              <div key={accountType}>
                <h3>{accountType}</h3>
                {initParams[accountType] && initParams[accountType].map((param, paramIndex) => (
                  <div key={paramIndex}>
                    <input
                      type="text"
                      value={param.name}
                      onChange={(e) => handleInitParamChange(accountType, paramIndex, 'name', e.target.value)}
                      placeholder="Parameter Name"
                    />
                    <label>
                      <input
                        type="checkbox"
                        checked={param.required}
                        onChange={(e) => handleInitParamChange(accountType, paramIndex, 'required', e.target.checked)}
                      />
                      Required
                    </label>
                    <button type="button" onClick={() => deleteInitParam(accountType, paramIndex)}>Delete Parameter</button>
                  </div>
                ))}
                <button type="button" onClick={() => addInitParam(accountType)}>Add Parameter</button>
              </div>
            ))}
          </div>
          <div className="form-div">
            <h2>Instructions</h2>
            {instructions && instructions.map((instruction, instructionIndex) => (
              <div key={instructionIndex}>
                <input
                  type="text"
                  value={instruction.name}
                  onChange={(e) => handleInstructionParamChange(instructionIndex, null, 'name', e.target.value)}
                  placeholder="Instruction Name"
                />
                {instruction.parameters && instruction.parameters.map((param, paramIndex) => (
                  <div key={paramIndex}>
                    <input
                      type="text"
                      value={param.name}
                      onChange={(e) => handleInstructionParamChange(instructionIndex, paramIndex, 'name', e.target.value)}
                      placeholder="Parameter Name"
                    />
                    <input
                      type="text"
                      value={param.type}
                      onChange={(e) => handleInstructionParamChange(instructionIndex, paramIndex, 'type', e.target.value)}
                      placeholder="Parameter Type"
                    />
                    <label>
                      <input
                        type="checkbox"
                        checked={param.required}
                        onChange={(e) => handleInstructionParamChange(instructionIndex, paramIndex, 'required', e.target.checked)}
                      />
                      Required
                    </label>
                    <button type="button" onClick={() => deleteInstructionParam(instructionIndex, paramIndex)}>Delete Parameter</button>
                  </div>
                ))}
                <button type="button" onClick={() => addInstructionParam(instructionIndex)}>Add Parameter</button>
              </div>
            ))}
          </div>
          <div className="form-div">
            <h2>State Transitions</h2>
            {stateTransitions && stateTransitions.map((transition, transitionIndex) => (
              <div key={transitionIndex}>
                <input
                  type="text"
                  value={transition.name}
                  onChange={(e) => handleStateTransitionChange(transitionIndex, 'name', e.target.value)}
                  placeholder="Transition Name"
                />
                <input
                  type="text"
                  value={transition.from}
                  onChange={(e) => handleStateTransitionChange(transitionIndex, 'from', e.target.value)}
                  placeholder="From State"
                />
                <input
                  type="text"
                  value={transition.to}
                  onChange={(e) => handleStateTransitionChange(transitionIndex, 'to', e.target.value)}
                  placeholder="To State"
                />
                <button type="button" onClick={() => deleteStateTransition(transitionIndex)}>Delete Transition</button>
              </div>
            ))}
            <button type="button" onClick={addStateTransition}>Add State Transition</button>
          </div>
          <div className="form-div">
            <h2>Errors</h2>
            {errors && errors.map((error, errorIndex) => (
              <div key={errorIndex}>
                <input
                  type="number"
                  value={error.code}
                  onChange={(e) => handleErrorChange(errorIndex, 'code', e.target.value)}
                  placeholder="Error Code"
                />
                <input
                  type="text"
                  value={error.message}
                  onChange={(e) => handleErrorChange(errorIndex, 'message', e.target.value)}
                  placeholder="Error Message"
                />
                <button type="button" onClick={() => deleteError(errorIndex)}>Delete Error</button>
              </div>
            ))}
            <button type="button" onClick={addError}>Add Error</button>
          </div>
          <div className="form-div">
            <h2>Security Requirements</h2>
            {security && security.map((requirement, securityIndex) => (
              <div key={securityIndex}>
                <input
                  type="text"
                  value={requirement.requirement}
                  onChange={(e) => handleSecurityChange(securityIndex, 'requirement', e.target.value)}
                  placeholder="Requirement"
                />
                <input
                  type="text"
                  value={requirement.description}
                  onChange={(e) => handleSecurityChange(securityIndex, 'description', e.target.value)}
                  placeholder="Description"
                />
                <button type="button" onClick={() => deleteSecurityRequirement(securityIndex)}>Delete Requirement</button>
              </div>
            ))}
            <button type="button" onClick={addSecurityRequirement}>Add Security Requirement</button>
          </div>
          <div className="form-div">
            <h2>Integration Points</h2>
            {integrationPoints && integrationPoints.map((integration, integrationIndex) => (
              <div key={integrationIndex}>
                <input
                  type="text"
                  value={integration.type}
                  onChange={(e) => handleIntegrationPointChange(integrationIndex, 'type', e.target.value)}
                  placeholder="Type"
                />
                <input
                  type="text"
                  value={integration.description}
                  onChange={(e) => handleIntegrationPointChange(integrationIndex, 'description', e.target.value)}
                  placeholder="Description"
                />
                <button type="button" onClick={() => deleteIntegrationPoint(integrationIndex)}>Delete Integration Point</button>
              </div>
            ))}
            <button type="button" onClick={addIntegrationPoint}>Add Integration Point</button>
          </div>
          <div className="form-div">
            <h2>Testing Scenarios</h2>
            {testing && testing.map((test, testIndex) => (
              <div key={testIndex}>
                <input
                  type="text"
                  value={test.scenario}
                  onChange={(e) => handleTestingChange(testIndex, 'scenario', e.target.value)}
                  placeholder="Scenario"
                />
                <input
                  type="text"
                  value={test.description}
                  onChange={(e) => handleTestingChange(testIndex, 'description', e.target.value)}
                  placeholder="Description"
                />
                <button type="button" onClick={() => deleteTestingScenario(testIndex)}>Delete Testing Scenario</button>
              </div>
            ))}
            <button type="button" onClick={addTestingScenario}>Add Testing Scenario</button>
          </div>
          <div className="form-div">
            <h2>Performance Metrics</h2>
            {performanceMetrics && performanceMetrics.map((metric, metricIndex) => (
              <div key={metricIndex}>
                <input
                  type="text"
                  value={metric.metric}
                  onChange={(e) => handlePerformanceMetricChange(metricIndex, 'metric', e.target.value)}
                  placeholder="Metric"
                />
                <input
                  type="text"
                  value={metric.description}
                  onChange={(e) => handlePerformanceMetricChange(metricIndex, 'description', e.target.value)}
                  placeholder="Description"
                />
                <button type="button" onClick={() => deletePerformanceMetric(metricIndex)}>Delete Performance Metric</button>
              </div>
            ))}
            <button type="button" onClick={addPerformanceMetric}>Add Performance Metric</button>
          </div>
          <div className="form-div">
            <h2>Development Environment</h2>
            <h3>Tools</h3>
            {developmentEnvironment.tools && developmentEnvironment.tools.map((tool, toolIndex) => (
              <div key={toolIndex}>
                <input
                  type="text"
                  value={tool.name}
                  onChange={(e) => handleDevelopmentToolChange(toolIndex, 'name', e.target.value)}
                  placeholder="Tool Name"
                />
                <input
                  type="text"
                  value={tool.description}
                  onChange={(e) => handleDevelopmentToolChange(toolIndex, 'description', e.target.value)}
                  placeholder="Tool Description"
                />
                <button type="button" onClick={() => deleteDevelopmentTool(toolIndex)}>Delete Tool</button>
              </div>
            ))}
            <button type="button" onClick={addDevelopmentTool}>Add Tool</button>
            <h3>Deployment Configuration</h3>
            <div>
              <input
                type="text"
                value={developmentEnvironment.deployment_configuration.network}
                onChange={(e) => handleDeploymentConfigChange('network', e.target.value)}
                placeholder="Network"
              />
              <input
                type="text"
                value={developmentEnvironment.deployment_configuration.account_keys}
                onChange={(e) => handleDeploymentConfigChange('account_keys', e.target.value)}
                placeholder="Account Keys Path"
              />
              <input
                type="text"
                value={developmentEnvironment.deployment_configuration.deployment_scripts}
                onChange={(e) => handleDeploymentConfigChange('deployment_scripts', e.target.value)}
                placeholder="Deployment Scripts Path"
              />
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
        {defaultMessage && <p>{defaultMessage}</p>}
        {savedDesign && (
          <div className="design-overview">
            <h2>Saved Account Design Overview</h2>
            <h3>Roles and Permissions</h3>
            <div className="section-div">
              {savedDesign.roles && savedDesign.roles.map((role, index) => (
                <div className="account-design-section" key={index}>
                  <p>
                    <strong>Role:</strong> {role.name}
                  </p>
                  <p>
                    <strong>Permissions:</strong> {role.permissions.join(', ')}
                  </p>
                </div>
              ))}
            </div>
            <h3>Entities and Relationships</h3>
            <div className="section-div">
              {savedDesign.entities && savedDesign.entities.map((entity, index) => (
                <div className="account-design-section" key={index}>
                  <p>
                    <strong>Entity:</strong> {entity.name}
                  </p>
                  <p>
                    <strong>Relationships:</strong> {entity.relationships.join(', ')}
                  </p>
                </div>
              ))}
            </div>
            <h3>Use Cases</h3>
            {savedDesign.useCases && savedDesign.useCases.map((useCase, index) => (
              <div key={index}>
                <p>{useCase}</p>
              </div>
            ))}
            <h3>Accounts and Fields</h3>
            {savedDesign.accounts && savedDesign.accounts.map((account, accountIndex) => (
              <div key={accountIndex}>
                <p><strong>{account.name}</strong></p>
                {account.fields && account.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex}>
                    <p>Field Name: {field.name}</p>
                    <p>Field Type: {field.type}</p>
                    <p>Required: {field.required ? 'Yes' : 'No'}</p>
                  </div>
                ))}
              </div>
            ))}
            <h3>Initialization Parameters</h3>
            {Object.keys(savedDesign.init_params).map(accountType => (
              <div key={accountType}>
                <h4>{accountType}</h4>
                {savedDesign.init_params[accountType] && savedDesign.init_params[accountType].map((param, paramIndex) => (
                  <div key={paramIndex}>
                    <p>Parameter Name: {param.name}</p>
                    <p>Required: {param.required ? 'Yes' : 'No'}</p>
                  </div>
                ))}
              </div>
            ))}
            <h3>Instructions</h3>
            {savedDesign.instructions && savedDesign.instructions.map((instruction, instructionIndex) => (
              <div key={instructionIndex}>
                <p><strong>{instruction.name}</strong></p>
                {instruction.parameters && instruction.parameters.map((param, paramIndex) => (
                  <div key={paramIndex}>
                    <p>Parameter Name: {param.name}</p>
                    <p>Parameter Type: {param.type}</p>
                    <p>Required: {param.required ? 'Yes' : 'No'}</p>
                  </div>
                ))}
              </div>
            ))}
            <h3>State Transitions</h3>
            {savedDesign.state_transitions && savedDesign.state_transitions.map((transition, transitionIndex) => (
              <div key={transitionIndex}>
                <p>Transition Name: {transition.name}</p>
                <p>From: {transition.from}</p>
                <p>To: {transition.to}</p>
              </div>
            ))}
            <h3>Errors</h3>
            {savedDesign.errors && savedDesign.errors.map((error, errorIndex) => (
              <div key={errorIndex}>
                <p>Error Code: {error.code}</p>
                <p>Message: {error.message}</p>
              </div>
            ))}
            <h3>Security Requirements</h3>
            {savedDesign.security && savedDesign.security.map((requirement, securityIndex) => (
              <div key={securityIndex}>
                <p>Requirement: {requirement.requirement}</p>
                <p>Description: {requirement.description}</p>
              </div>
            ))}
            <h3>Integration Points</h3>
            {savedDesign.integration_points && savedDesign.integration_points.map((integration, integrationIndex) => (
              <div key={integrationIndex}>
                <p>Type: {integration.type}</p>
                <p>Description: {integration.description}</p>
              </div>
            ))}
            <h3>Testing Scenarios</h3>
            {savedDesign.testing && savedDesign.testing.map((test, testIndex) => (
              <div key={testIndex}>
                <p>Scenario: {test.scenario}</p>
                <p>Description: {test.description}</p>
              </div>
            ))}
            <h3>Performance Metrics</h3>
            {savedDesign.performance_metrics && savedDesign.performance_metrics.map((metric, metricIndex) => (
              <div key={metricIndex}>
                <p>Metric: {metric.metric}</p>
                <p>Description: {metric.description}</p>
              </div>
            ))}
            <h3>Development Environment</h3>
            <h4>Tools</h4>
            {savedDesign.development_environment.tools && savedDesign.development_environment.tools.map((tool, toolIndex) => (
              <div key={toolIndex}>
                <p>Tool Name: {tool.name}</p>
                <p>Description: {tool.description}</p>
              </div>
            ))}
            <h4>Deployment Configuration</h4>
            <div>
              <p>Network: {savedDesign.development_environment.deployment_configuration.network}</p>
              <p>Account Keys: {savedDesign.development_environment.deployment_configuration.account_keys}</p>
              <p>Deployment Scripts: {savedDesign.development_environment.deployment_configuration.deployment_scripts}</p>
            </div>
            {savedDesign.generatedOverview && (
              <div>
                <h3>Generated Overview</h3>
                <p>{savedDesign.generatedOverview}</p>
              </div>
            )}
          </div>
        )}
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            style={{ width: '100%', height: '600px' }}
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export default AccountDesign;
