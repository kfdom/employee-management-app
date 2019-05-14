import React from 'react';
import { connect } from 'react-redux';
import { loadView, addUpdateUser, deleteUser } from '../actions/user';
import Alert from './Alert';
import ViewByUserField from './Fields/ViewByUserField';
import AddEditByUserField from './Fields/AddEditByUserField';

const UserManagementSection = ({
  loadView,
  currentView,
  selectedUser,
  roleList,
  teamList,
  addUpdateUser,
  deleteUser,
  profileImgList
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
        {selectedUser && currentView === 'View' && (
          <ViewByUserField
            selectedUser={selectedUser}
            deleteUser={deleteUser}
            loadView={loadView}
          />
        )}
        {(currentView === 'Add' || currentView === 'Edit') && (
          <AddEditByUserField
            roleList={roleList}
            teamList={teamList}
            addUpdateUser={addUpdateUser}
            profileImgList={profileImgList}
            currentView={currentView}
            selectedUser={selectedUser}
          />
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
    teamList: state.team.teamList,
    profileImgList: state.profileimg.profileImgList
  };
};

export default connect(
  mapStateToProps,
  { loadView, addUpdateUser, deleteUser }
)(UserManagementSection);
