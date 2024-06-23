import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import useStyles from './style';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordVerify) {
      setError('Passwords do not match');
      return;
    }

    const response = await fetch(`http://localhost:3000/users?username=${username}`);
      const users = await response.json();
      console.log("registerUser:",users);
      if(users.length > 0)
        {
          setError('User already exists');
          return;
        }

    // Add a new user
    // fetch('http://localhost:3000/users', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ "username": username, "website": password }),
    // })
    //   .then(response => response.json())
    //   .then(user => {console.log('User added:', user); localStorage.setItem('user', JSON.stringify(user));});

    // Save user details and redirect
    localStorage.setItem('tempRegisterUser', JSON.stringify({ "username": username, "website": password }));

    // Clear the form
    setUsername('');
    setPassword('');

    navigate('/completion_of_details');
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}>
        <TextField
        style={{fontFamily: 'Figtree'}}
        className={classes.customTextField}
          type="text"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          type="password"
          label="Verify Password"
          value={passwordVerify}
          onChange={(e) => setPasswordVerify(e.target.value)}
          required
        />
       
        <button type="submit">Register</button>
        <div>Do you have an account? <a href="/login">Login</a></div>

        </div>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Register;
