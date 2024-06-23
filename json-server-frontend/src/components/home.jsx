import  React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Info from './info';
import '../css/home.css';
import Typewriter from 'typewriter-effect';


const Home = ( { user, setUser, InfoVisible, handleInfo }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };



  const bigUserName = user.username? user.username.toUpperCase(): '?';

  return (
    <div className='back-img' style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <div className='popup-overlay' style={{display: InfoVisible? "flex": "none" }}>
        <div className='popup-content'>
      <Info user={user} handleInfo={handleInfo}></Info>
      </div>
      </div>
      <button className='upper-right-corner' style={{display: 'flex', flexDirection: 'column', alignItems: 
          'center', justifyContent: 'center'}} onClick={handleLogout}>
            <img style={{width: '40px'}} src='./img/logout.png' alt='' />
            Logout</button>
      <header>
        <h1>Welcome, {user.username}!</h1>

        <nav>
          {/* <Link onClick={handleInfo}>Info </Link>
          <Link to="/todos">Todos </Link>
          <Link to="/posts">Posts </Link>
          <Link to="/albums">Albums </Link> */}

        </nav>
      </header>
      <main style={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
        <div className='typewriter-container'>
      <Typewriter
  options={{
    strings: [`GLAD YOU CAME!`, 'WHAT DO YOU WANT TO DO TODAY?'],
    autoStart: true,
    loop: true,
     wrapperClassName: 'typewriter-text',
    cursorClassName: 'typewriter-cursor'
  }}
  
/> 
</div>
    </main>
    </div>
  );
};

export default Home;
