import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, Router } from 'react-router-dom';
import { LoginForm } from './components/LoginForm/LoginForm';
import { Main } from './components/Main/Main';
import { Header } from './components/Header/Header';
import { apiUrl } from './config/api';
import Cookies from 'js-cookie';
import './App.css';

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = Cookies.get('token');
  const handleLogin = async (username: string, password: string) => {
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false)
      try {
        const response = await fetch(`${apiUrl}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
          const data = await response.json();
          const token = data.token;
          setIsAuthenticated(true);
          //Token umieszczony w ciasteczku
          Cookies.set('token', token, { expires: 15 / (60 * 24) }); // 15 minut

        } else {
          console.error('Login failed.');
        };
      } catch (error) {
        console.error('An error occurred:', error);
      };
    };
  };

  const defaultRedirect = isAuthenticated ? <Navigate to="/my" /> : <Navigate to="/login" />;

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={defaultRedirect} />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/my" /> : <LoginForm onLogin={handleLogin} />} />
        <Route
          path="/my"
          element={
            isAuthenticated ? (<Main />) : (<Navigate to="/login" />)} />
      </Routes>
      <Outlet />
    </div>
  );
}