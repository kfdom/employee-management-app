import React, { useState, useEffect } from 'react';

const AddEditByUserField = ({ roleList, teamList, addUser }) => {
  useEffect(() => {
    let inputNode = document.getElementById('address');
    let autoComplete = new window.google.maps.places.Autocomplete(inputNode);
    autoComplete.setComponentRestrictions({
      country: ['nz']
    });
    autoComplete.setFields(['formatted_address', 'address_components', 'geometry']);
    autoComplete.addListener('place_changed', () => {
      let place = autoComplete.getPlace();
      let location = place.geometry.location;
    });
  }, []);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [role, setRole] = useState();
  const [team, setTeam] = useState();
  const [address, setAddress] = useState();
  return (
    <div className="container-border">
      <div className="text-left">
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
          />
        </div>
        <div className="form-group">
          <label htmlFor="Role">Role</label>
          <select className="form-control" required onChange={e => setRole(e.target.value)}>
            <option value="">Please select Role</option>
            {roleList.map(role => {
              return (
                <>
                  <option value={role._id}>{role.role}</option>
                </>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="Role">Team</label>
          <select className="form-control" required onChange={e => setTeam(e.target.value)}>
            <option value="">Please select Team</option>
            {teamList.map(team => {
              return (
                <>
                  <option value={team._id}>{team.team}</option>
                </>
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
          />
        </div>
      </div>
      <button
        type="button"
        className="button-green"
        onClick={() => addUser({ name, email, role, team, address })}
      >
        ADD EMPLOYEE
      </button>
    </div>
  );
};

export default AddEditByUserField;
