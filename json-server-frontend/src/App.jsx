import React from 'react';
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

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NavigateHandler />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/completion_of_details" element={<CompletionOfDetails />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/info" element={<PrivateRoute><Info /></PrivateRoute>} />
        <Route path="/todos" element={<PrivateRoute><Todos /></PrivateRoute>} />
        <Route path="/posts" element={<PrivateRoute><Posts /></PrivateRoute>} />
        <Route path="/albums" element={<PrivateRoute><Albums /></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
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
