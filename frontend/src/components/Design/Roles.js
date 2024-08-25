import React from 'react';

const Roles = ({ roles, handleFieldChange, handleSubmit, handleKeyPress, addField }) => {

  const handleRoleChange = (index, field) => (e) => {
    handleFieldChange('roles', null, index, field, e.target.value);
  };

  return (
    <div>
      {roles.map((role, index) => (
        <div key={index} className='form-inner-section'>
          <label>Role Name:</label>
          <input
            type="text"
            value={role.roleName}
            onChange={handleRoleChange(index, 'roleName')}
          />
          <button onClick={() => handleSubmit('roles', index, 'roleName', role.roleName)} style={{border: 'none', background: 'none'}}>
            ➔
          </button>
          
          <label>Description:</label>
          <input
            type="text"
            value={role.description}
            onChange={handleRoleChange(index, 'description')}
          />
          <button onClick={() => handleSubmit('roles', index, 'description', role.description)} style={{border: 'none', background: 'none'}}>
            ➔
          </button>

          <label>Permissions:</label>
          <input
            type="text"
            value={role.permissions.join(', ')} // Display permissions as comma-separated string
            onChange={(e) => handleFieldChange('roles', null, index, 'permissions', e.target.value.split(', '))}
          />
          <button onClick={() => handleSubmit('roles', index, 'permissions', role.permissions)} style={{border: 'none', background: 'none'}}>
            ➔
          </button>

        </div>
      ))}
      <button onClick={() => addField('roles', { roleName: '', permissions: [], description: '' })}>
        Add New Role
      </button>
    </div>
  );
};

export default Roles;
