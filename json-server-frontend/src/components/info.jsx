import React from 'react';

const Info = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      
      <h2>User Information</h2>
      <p>Username: {user.username}</p>
      <p>Full Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Address: {user.address.street? user.address.street: ""} {user.address.suite? user.address.suite: ""} {user.address.city? user.address.city: ""}</p>
      <p>Company: {user.company.name}</p>
    </div>
  );
};

export default Info;
