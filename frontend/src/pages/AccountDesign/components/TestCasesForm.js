import React from 'react';

const TestCasesForm = ({ test_cases, handleNestedFieldChange, addNestedField }) => {
  return (
    <div className="section">
      <div className="section-content">
        {test_cases.cases.map((testCase, testCaseIndex) => (
          <div key={testCaseIndex}>
            <input
              type="text"
              value={testCase.test_case_id}
              onChange={(e) => handleNestedFieldChange('test_cases.cases', testCaseIndex, 'test_case_id', e.target.value)}
              placeholder="Test Case ID"
            />
            <textarea
              value={testCase.description}
              onChange={(e) => handleNestedFieldChange('test_cases.cases', testCaseIndex, 'description', e.target.value)}
              placeholder="Description"
            />
            <textarea
              value={testCase.expected_result}
              onChange={(e) => handleNestedFieldChange('test_cases.cases', testCaseIndex, 'expected_result', e.target.value)}
              placeholder="Expected Result"
            />
          </div>
        ))}
        <button type="button" onClick={() => addNestedField('test_cases.cases', { test_case_id: "", description: "", expected_result: "" })}>
          Add Test Case
        </button>
      </div>
    </div>
  );
};

export default TestCasesForm;
