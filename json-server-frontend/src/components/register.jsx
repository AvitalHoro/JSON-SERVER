import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordVerify) {
      setError('Passwords do not match');
      return;
    }

    const newUser = { username, password, fullName: 'New User' }; // Replace with real server call

    // Save user details and redirect
    localStorage.setItem('user', JSON.stringify(newUser));
    navigate('/home');
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="password"
          value={passwordVerify}
          onChange={(e) => setPasswordVerify(e.target.value)}
          placeholder="Verify Password"
        />
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;
