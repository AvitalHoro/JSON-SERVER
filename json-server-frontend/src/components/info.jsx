import React from 'react';

const Info = ( { user, handleInfo } ) => {

  return (
    <div>
      <h2 style={{backgroundColor: 'white', color: '#F6DE5C', borderRadius: '15px'}}>User Information</h2>
      { user ? (
        <div style={{textAlign: 'start'}}>
      <p>Username: {user.username}</p>
      <p>Full Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      { user.address? (<p>Address: {user.address.street? user.address.street: ""} {user.address.suite? user.address.suite: ""} {user.address.city? user.address.city: ""}</p>) : (<p>Address: </p>)}
      { user.company? <p>Company: {user.company.name}</p> : <p>Company: </p>}
      </div>
    ) : (<div>Loading...</div>)}
    <button onClick={handleInfo}>Close</button>
    </div>
  );
};

export default Info;
