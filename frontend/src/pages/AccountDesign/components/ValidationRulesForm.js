import React from 'react';

const ValidationRulesForm = ({ validation_rules, handleNestedFieldChange, addNestedField }) => {
  return (
    <div className="section">
      <h2>Validation Rules</h2>
      <div className="section-content">
        {validation_rules.rules.map((rule, ruleIndex) => (
          <div key={ruleIndex}>
            <input
              type="text"
              value={rule.field_name}
              onChange={(e) => handleNestedFieldChange('validation_rules.rules', ruleIndex, 'field_name', e.target.value)}
              placeholder="Field Name"
            />
            <input
              type="text"
              value={rule.validation_type}
              onChange={(e) => handleNestedFieldChange('validation_rules.rules', ruleIndex, 'validation_type', e.target.value)}
              placeholder="Validation Type"
            />
            <textarea
              value={rule.constraints}
              onChange={(e) => handleNestedFieldChange('validation_rules.rules', ruleIndex, 'constraints', e.target.value)}
              placeholder="Constraints"
            />
          </div>
        ))}
        <button type="button" onClick={() => addNestedField('validation_rules.rules', { field_name: "", validation_type: "", constraints: "" })}>
          Add Validation Rule
        </button>
      </div>
    </div>
  );
};

export default ValidationRulesForm;
