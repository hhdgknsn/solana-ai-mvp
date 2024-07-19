import React from 'react';
import UserAccountForm from './components/UserAccountForm.js';
import ProgramAccountForm from './components/ProgramAccountForm.js';
import ReactFlowWrapper from './components/ReactFlowWrapper.js';
import useAccountDesign from './hooks/useAccountDesign.js';
import '../../styles/AccountDesign.css';

const AccountDesign = () => {
  const {
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
  } = useAccountDesign();

  return (
    <div className="account-design-container">
      <h1>Account Design & Use Cases</h1>
      <div className="account-design-container-inner">
        <form className='xyz' onSubmit={handleSubmit}>
          <UserAccountForm
            accounts={userAccounts}
            handleFieldChange={handleFieldChange}
            handleNestedFieldChange={handleNestedFieldChange}
            addField={addField}
            addNestedField={addNestedField}
            setUserAccounts={setUserAccounts}
          />
          <ProgramAccountForm
            programAccounts={programAccounts}
            handleFieldChange={handleFieldChange}
            handleNestedFieldChange={handleNestedFieldChange}
            addField={addField}
            addNestedField={addNestedField}
            setProgramAccounts={setProgramAccounts}
          />
          <button type="submit">Submit</button>
        </form>
        {defaultMessage && <p>{defaultMessage}</p>}
        {savedDesign && (
          <div className="design-overview">
            <h2>Saved Account Design Overview</h2>
            {/* Overview content based on savedDesign */}
          </div>
        )}
        <ReactFlowWrapper />
      </div>
    </div>
  );
};

export default AccountDesign;
