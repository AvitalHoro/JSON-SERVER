import React from 'react';

const Info = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <h2>User Information</h2>
      <p>Username: {user.username}</p>
      <p>Full Name: {user.fullName}</p>
    </div>
  );
};

export default Info;
