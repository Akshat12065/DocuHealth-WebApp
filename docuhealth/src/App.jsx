import { useState, useEffect } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Outlet } from 'react-router-dom';
import Register from './Pages/Register';

function App() {
  // later you can add conditional rendering using auth state
  return (
    <>
      <Register />
      <Outlet />
    </>
  );
}

export default App;
