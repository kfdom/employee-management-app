import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadView, addUser } from '../actions/user';
import Alert from './Alert';
import ViewByUserField from './Fields/ViewByUserField';
import AddEditByUserField from './Fields/AddEditByUserField';

const UserManagementSection = ({
  loadView,
  currentView,
  selectedUser,
  roleList,
  teamList,
  addUser
}) => {
  return (
    <>
      <div className="text-center">
        <button className="button-black" onClick={() => loadView('Add')}>
          CREATE A NEW EMPLOYEE
        </button>
        <div className="bottom-large-spacing" />
        <Alert />
        <div className="bottom-large-spacing" />
        {selectedUser && currentView === 'View' && <ViewByUserField selectedUser={selectedUser} />}
        {currentView === 'Add' && (
          <AddEditByUserField roleList={roleList} teamList={teamList} addUser={addUser} />
        )}
      </div>
    </>
  );
};

const mapStateToProps = state => {
  console.log('ALL STATE', state);
  return {
    currentView: state.user.currentView,
    selectedUser: state.user.selectedUser,
    roleList: state.role.roleList,
    teamList: state.team.teamList
  };
};

export default connect(
  mapStateToProps,
  { loadView, addUser }
)(UserManagementSection);
