import React from 'react';
import Card from '../FormElements/Card';

const UsersByRoleField = ({ userRole, users, onClick }) => (
  <>
    {users.length > 0 && <div className="role-heading">{userRole}</div>}
    {users.map(user => {
      return <Card user={user} onClick={onClick} />;
    })}
  </>
);

export default UsersByRoleField;
