import React from 'react';
import Card from '../FormElements/Card';

const UsersByRoleField = ({ userRole, users, onClick, currentActiveUser }) => (
  <>
    {users.length > 0 && <div className="role-heading">{userRole}</div>}
    {users.map(user => {
      return (
        <Card
          user={user}
          onClick={onClick}
          isSelected={currentActiveUser && currentActiveUser._id === user._id}
        />
      );
    })}
  </>
);

export default UsersByRoleField;
