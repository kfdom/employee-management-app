import React, { useState, useEffect } from 'react';

const AddEditByUserField = ({
  roleList,
  teamList,
  profileImgList,
  addUpdateUser,
  currentView,
  selectedUser
}) => {
  useEffect(() => {
    var inputNode = document.getElementById('address');
    let autoComplete = new window.google.maps.places.Autocomplete(inputNode);
    autoComplete.setComponentRestrictions({
      country: ['nz']
    });
    autoComplete.setFields(['formatted_address', 'address_components', 'geometry']);
    autoComplete.addListener('place_changed', () => {
      inputNode.focus();
    });
  }, []);

  let defaultName = '';
  let defaultEmail = '';
  let defaultRole = '';
  let defaultTeam = '';
  let defaultAddress = '';
  let defaultProfileImg = '';

  if (currentView === 'Edit') {
    defaultName = selectedUser.name;
    defaultEmail = selectedUser.email;
    defaultRole = selectedUser.role;
    defaultTeam = selectedUser.team;
    defaultAddress = selectedUser.address;
    defaultProfileImg = selectedUser.image;
  }

  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [role, setRole] = useState(defaultRole);
  const [team, setTeam] = useState(defaultTeam);
  const [address, setAddress] = useState(defaultAddress);
  const [profileImg, setProfileImg] = useState(defaultProfileImg);

  return (
    <div className="container-border">
      <div className="text-left">
        <div className="form-group">
          <label htmlFor="ProfileImg">Profile Image</label>
          <select
            className="form-control"
            onChange={e => setProfileImg(e.target.value)}
            defaultValue={profileImg}
          >
            <option key="0" value="">
              Please select Profile Image
            </option>
            {profileImgList.map((img, index) => {
              return (
                <option key={index + 1} value={img._id}>
                  {img.filename}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Email">Email Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            readOnly={currentView === 'Edit'}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Role">Role</label>
          <select
            className="form-control"
            required
            onChange={e => setRole(e.target.value)}
            defaultValue={role}
          >
            <option key="0" value="">
              Please select Role
            </option>
            {roleList.map((r, index) => {
              return (
                <option key={index + 1} value={r._id}>
                  {r.role}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="Team">Team</label>
          <select
            className="form-control"
            required
            onChange={e => setTeam(e.target.value)}
            defaultValue={team}
          >
            <option key="0" value="">
              Please select Team
            </option>
            {teamList.map((t, index) => {
              return (
                <option key={index + 1} value={t._id}>
                  {t.team}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="Address"
            onChange={e => setAddress(e.target.value)}
            onBlur={e => setAddress(e.target.value)}
            value={address}
          />
        </div>
      </div>
      <button
        type="button"
        className="button-green"
        onClick={() =>
          currentView === 'Add'
            ? addUpdateUser({ name, email, role, team, address, profileImg })
            : addUpdateUser({ name, email, role, team, address, profileImg, id: selectedUser._id })
        }
      >
        {currentView === 'Add' ? 'ADD EMPLOYEE' : 'UPDATE EMPLOYEE'}
      </button>
    </div>
  );
};

export default AddEditByUserField;
