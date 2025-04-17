// src/routes/Router.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default Router;
