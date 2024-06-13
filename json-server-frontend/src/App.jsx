import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Home from './components/home';
import Info from './components/info';
import Todos from './components/todos';
import Posts from './components/posts';
import Albums from './components/albums';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/info" element={<PrivateRoute><Info /></PrivateRoute>} />
        <Route path="/todos" element={<PrivateRoute><Todos /></PrivateRoute>} />
        <Route path="/posts" element={<PrivateRoute><Posts /></PrivateRoute>} />
        <Route path="/albums" element={<PrivateRoute><Albums /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

const PrivateRoute = ({ children }) => {
  return localStorage.getItem('user') ? children : <Navigate to="/login" />;
};

export default App;
