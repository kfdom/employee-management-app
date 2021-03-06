import React, { useState } from 'react';
import { connect } from 'react-redux';
import UsersByRoleField from './Fields/UsersByRoleField';
import { loadView } from '../actions/user';

const UserListSection = ({ userList, loadView, selectedUser, loading }) => {
  const [searchText, setSearchText] = useState();
  const [sortType, setSortType] = useState(-1);

  const allUsers = !searchText
    ? userList
    : userList.filter(
        user =>
          user.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0 ||
          user.roledesc[0].role.toLowerCase().indexOf(searchText.toLowerCase()) >= 0 ||
          user.teamdesc[0].team.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
      );

  const allUsersAfterSort = allUsers.sort(function(a, b) {
    a = new Date(a.date);
    b = new Date(b.date);
    return a > b ? -1 * -sortType : a < b ? 1 * -sortType : 0;
  });

  const admins = allUsersAfterSort.filter(user => user.roledesc[0].role === 'Admin');
  const employees = allUsersAfterSort.filter(user => user.roledesc[0].role === 'Employee');

  return (
    <>
      {loading ? (
        <>
          <div className="loading-div">
            <h3>Loading...</h3>
            <div className="loading">
              <i className="fas fa-spinner" />
            </div>
          </div>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search Employee"
            className="search-input"
            onChange={e => setSearchText(e.target.value)}
          />
          <div className="bottom-large-spacing" />
          <div className="float-right">
            <span className="text-medium">Sort By:</span>{' '}
            <span
              className="text-large"
              style={{ cursor: 'pointer' }}
              onClick={() => setSortType(-sortType)}
            >
              Date/Time
            </span>
          </div>
          <UsersByRoleField
            users={admins}
            userRole={`Admin`}
            onClick={loadView}
            currentActiveUser={selectedUser}
          />
          <UsersByRoleField
            users={employees}
            userRole={`Employee`}
            onClick={loadView}
            currentActiveUser={selectedUser}
          />
        </>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    userList: state.user.userList,
    selectedUser: state.user.selectedUser,
    loading: state.user.loading
  };
};

export default connect(
  mapStateToProps,
  { loadView }
)(UserListSection);
