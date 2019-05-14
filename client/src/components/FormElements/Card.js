import React from 'react';

const Card = ({ user, onClick }) => (
  <div className="card-style" onClick={() => onClick('View', user._id)}>
    <div className="row">
      <div className="col-md-3">
        <img
          className="profile-img-small"
          src="http://localhost:5000/uploads/andy.png"
          alt="Not Found"
        />
      </div>
      <div className="col-md-9">
        <div className="text-large">{user.name}</div>
        <div className="text-medium">{user.roledesc[0].role}</div>
        <div className="text-small">{user.teamdesc[0].team}</div>
      </div>
    </div>
  </div>
);

export default Card;
