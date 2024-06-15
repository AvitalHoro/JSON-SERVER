import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Info from './info';

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [InfoVisible, setInfoVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleInfo = () => {
    setInfoVisible(!InfoVisible);
  };


  return (
    <div>
      <div style={{display: InfoVisible? "block": "none" }}>
        <div>
      <Info></Info>
      </div>
      </div>
      <header>
        <h1>Welcome, {user.username}</h1>
        <nav>
          <Link onClick={handleInfo}>Info </Link>
          <Link to="/todos">Todos </Link>
          <Link to="/posts">Posts </Link>
          <Link to="/albums">Albums </Link>
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
