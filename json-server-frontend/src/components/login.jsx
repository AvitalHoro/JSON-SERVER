import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/users?username=${username}`);
      const users = await response.json();
      console.log(users);

      let userIsExist = false;
      let currentUser;

      if (users.length === 0) {
        setErrorMessage('User not found');
      } else {
        users.forEach(user => {
          if (user.website === password)
            userIsExist = true;
            currentUser = user;
        });
        
        if (userIsExist === true) {
          setErrorMessage(''); // Clear any previous error messages
          // Perform successful login actions here (e.g., redirect, store user data)
          console.log('Login successful');
          userIsExist=false;
          localStorage.setItem('user', JSON.stringify(currentUser));
          navigate('/home');

          console.log('Login successful2');
        } else {
          setErrorMessage('Incorrect password');
        }
      }
    } catch (error) {
      setErrorMessage('An error occurred while logging in');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default Login;
