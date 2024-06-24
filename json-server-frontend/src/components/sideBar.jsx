import React from 'react';
import '../css/sideBar.css';
import { Link } from 'react-router-dom';



{/* <Link onClick={handleInfo}>Info </Link>
          <Link to="/todos">Todos </Link>
          <Link to="/posts">Posts </Link>
          <Link to="/albums">Albums </Link> */}

const Sidebar = ( { handleInfo } ) => {

    const sidebarOptions = [
        { to: '/home', imgSrc: './img/home.png', title: 'Home' },
        { to: '', onClick: handleInfo, imgSrc: './img/info.png', title: 'Info' },
        { to: '/todos', imgSrc: './img/todos.png', title: 'Todos' },
        { to: '/posts', imgSrc: './img/posts.png', title: 'Posts' },
        { to: '/albums', imgSrc: './img/albums.png', title: 'Albums' },
      ];
      
  return (
    <div className="sidebar">
      <img className="logo-img nav-link" src="/client/img/logo.png" alt="" />
      {sidebarOptions.map((option, index) => (
        <Link onClick={option.onClick} to={option.to}>
        <div className="option nav-link">
          <img src={option.imgSrc} alt="" />
          <span className="option-title">{option.title}</span>
        </div>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
