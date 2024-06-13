import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div>
      <header>
        <h1>Welcome, {user.username}</h1>
        <nav>
          <Link to="/info">Info </Link>
          <Link to="/todos">Todos </Link>
          <Link to="/posts">Posts </Link>
          <Link to="/albums">Albums</Link>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>
      <main>
        <p>This is the home page content.</p>
      </main>
    </div>
  );
};

export default Home;
