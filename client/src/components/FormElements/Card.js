import React from 'react';

const Card = ({ user, onClick, isSelected }) => (
  <div
    className={isSelected ? 'card-style card-active' : 'card-style'}
    onClick={() => onClick('View', user._id)}
  >
    <div className="row">
      <div className="card-row">
        <img
          className="profile-img-small"
          src={`http://localhost:5000/uploads/${user.filename[0].filename}`}
          alt="Not Found"
        />
      </div>
      <div className="card-row">
        <div className="text-large bottom-small-spacing">{user.name}</div>
        <div className="text-medium bottom-small-spacing">{user.roledesc[0].role}</div>
        <div className="text-small bottom-small-spacing">{user.teamdesc[0].team}</div>
      </div>
    </div>
  </div>
);

export default Card;
