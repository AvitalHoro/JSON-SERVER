import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Home from './components/home';
import Info from './components/info';
import Todos from './components/todos';
import Posts from './components/posts';
import Albums from './components/albums';
import CompletionOfDetails from './components/CompletionOfDetails';
import NotFound from './components/NotFound';
import Sidebar from './components/sideBar';
import './App.css';
import PostDetails from './components/PostDetails';

const App = () => {

  const [User, setUser] = useState(localStorage.getItem('user'));
  const [InfoVisible, setInfoVisible] = useState(false);

  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleInfo = () => {
    setInfoVisible(!InfoVisible);
  };

  return (
    <Router>
            <div className="app-container">

      <Sidebar handleInfo={handleInfo}/>
      <div className="main-content">

      <Routes>
        <Route path="/" element={<NavigateHandler />} />
        <Route path="/login" element={<Login setUser={setUser}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/completion_of_details" element={<CompletionOfDetails setUser={setUser}/>} />
        <Route path="/home" element={<PrivateRoute><Home user={User} setUser={setUser} InfoVisible={InfoVisible} handleInfo={handleInfo}/></PrivateRoute>} />
        <Route path="/todos" element={<PrivateRoute><Todos user={User}/></PrivateRoute>} />
        <Route path="/posts" element={<PrivateRoute><Posts user={User}/></PrivateRoute>} />
        <Route path="/posts/:id" element={<PrivateRoute><PostDetails user={User} /></PrivateRoute>} />
        <Route path="/albums" element={<PrivateRoute><Albums user={User}/></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
      </div>
    </Router>
  );
};

const NavigateHandler = () => {
  const user = localStorage.getItem('user');
  const tempRegisterUser = localStorage.getItem('tempRegisterUser');

  if (user) {
    return <Navigate to="/home" />;
  } else if (tempRegisterUser) {
    return <Navigate to="/completion_of_details" />;
  } else {
    return <Navigate to="/login" />;
  }
};

const PrivateRoute = ({ children }) => {
  return localStorage.getItem('user') ? children : <Navigate to="/login" />;
};

export default App;
