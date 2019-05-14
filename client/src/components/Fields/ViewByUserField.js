import React from 'react';

const ViewByUserField = ({ selectedUser, deleteUser }) => (
  <>
    <div className="container-border">
      <div className="center">
        <img
          className="profile-img-large"
          src={`http://localhost:5000/uploads/${selectedUser.filename[0].filename}`}
          alt="Not Found"
        />
        <div className="text-xlarge bottom-spacing">{selectedUser.name}</div>
        <div className="text-small bottom-spacing">{selectedUser.email}</div>
        <div>
          <i className="fas fa-pen" />
          <i
            className="fas fa-times"
            style={{ color: 'red', marginLeft: '50px' }}
            onClick={() => {
              const confirmed = window.confirm('Are you sure you want to delete this employee?');
              if (!confirmed) {
                return;
              }
              deleteUser(selectedUser._id);
            }}
          />
        </div>
      </div>
      <hr />{' '}
      <div className="row text-left">
        <div className="col-md-6">
          <div className="text-small bottom-spacing">Role</div>
          <div className="text-medium bottom-spacing">{selectedUser.roledesc[0].role}</div>
        </div>
        <div className="col-md-6">
          <div className="text-small bottom-spacing">Team</div>
          <div className="text-medium bottom-spacing">{selectedUser.teamdesc[0].team}</div>
        </div>
      </div>
      <hr />{' '}
      <div className="text-left">
        <div className="text-small bottom-spacing">Address</div>
        <div className="text-medium bottom-spacing">{selectedUser.address}</div>
      </div>
      <button className="button-grey">SHARE</button>
    </div>
  </>
);

export default ViewByUserField;
