import React from 'react';
import OverallForm from './components/OverallForm.js';
import ReactFlowWrapper from './components/ReactFlowWrapper.js';
import useAccountDesign from './hooks/useAccountDesign.js';
import './styles/AccountDesign.css';
import './styles/userInputForm.css';

const AccountDesign = () => {
  const {
    savedDesign,
    defaultMessage,
    handleSubmit,
  } = useAccountDesign();

  return (
    <div className="account-design-container">
      <h2>Account Design & Use Cases</h2>
      <div className="account-design-container-inner">
        <form className='xyz' onSubmit={handleSubmit}>
          <OverallForm />
        </form>
        {defaultMessage && <p>{defaultMessage}</p>}
        {savedDesign && (
          <div className="design-overview">
            <h2>Account Design Overview</h2>
            {/* Overview content based on savedDesign */}
          </div>
        )}
        <ReactFlowWrapper />
      </div>
    </div>
  );
};

export default AccountDesign;
