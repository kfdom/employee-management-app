import React from 'react';
import { copyToClipboard } from '../../ultilities/ultilities';

const ViewByUserField = ({ selectedUser, deleteUser, loadView }) => (
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
          <i
            className="fas fa-pen"
            style={{ cursor: 'pointer' }}
            onClick={() => loadView('Edit', selectedUser._id)}
          />
          <i
            className="fas fa-times"
            style={{ color: 'red', marginLeft: '50px', cursor: 'pointer' }}
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
        <div className="card-info-top-row">
          <div className="text-small card-info-row">Role</div>
          <div className="text-medium card-info-row">{selectedUser.roledesc[0].role}</div>
        </div>
        <div className="card-info-top-row">
          <div className="text-small card-info-row">Team</div>
          <div className="text-medium card-info-row">{selectedUser.teamdesc[0].team}</div>
        </div>
      </div>
      <hr />{' '}
      <div className="text-center">
        <div className="text-small card-info-center-row">Address</div>
        <div className="text-medium card-info-center-row">{selectedUser.address}</div>
      </div>
      <button
        className="button-grey top-medium-spacing"
        onClick={() =>
          copyToClipboard(`${window.location.host}/iffinityuserid=${selectedUser._id}`)
        }
      >
        SHARE
      </button>
    </div>
  </>
);

export default ViewByUserField;
