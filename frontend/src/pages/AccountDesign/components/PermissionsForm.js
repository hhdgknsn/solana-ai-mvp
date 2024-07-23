import React from 'react';

const PermissionsForm = ({ permissions, handleNestedFieldChange, addNestedField }) => {
  return (
    <div className="section">
      <div className="section-content">
        {permissions.roles.map((role, roleIndex) => (
          <div key={roleIndex}>
            <input
              type="text"
              value={role.role_name}
              onChange={(e) => handleNestedFieldChange('permissions.roles', roleIndex, 'role_name', e.target.value)}
              placeholder="Role Name"
            />
            <textarea
              value={role.permissions.join(', ')}
              onChange={(e) => handleNestedFieldChange('permissions.roles', roleIndex, 'permissions', e.target.value.split(', '))}
              placeholder="Permissions (comma-separated)"
            />
          </div>
        ))}
        <button type="button" onClick={() => addNestedField('permissions.roles', { role_name: "", permissions: [] })}>
          Add Role
        </button>
      </div>
    </div>
  );
};

export default PermissionsForm;
