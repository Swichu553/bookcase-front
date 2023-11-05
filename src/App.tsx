import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, Router } from 'react-router-dom';
import { LoginForm } from './components/LoginForm/LoginForm';
import { Main } from './components/Main/Main';
import { Header } from './components/Header/Header';
import { apiUrl } from './config/api';
import { SearchContext } from './contexts/search.context';
import Cookies from 'js-cookie';
import './App.css';

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [search, setSearch] = useState('')
  const token = Cookies.get('token');
  const handleLogin = async (username: string, password: string) => {
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

  const defaultRedirect = isAuthenticated ? <Navigate to="/my" /> : <Navigate to="/login" />;

  return (
    <div>
      <Header />
      <SearchContext.Provider value={{ search, setSearch }}>
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/my" /> : <LoginForm onLogin={handleLogin} />} />
          <Route
            path="/my"
            element={
              isAuthenticated ? (<Main />) : (<Navigate to="/login" />)} />
          <Route path="/*" element={defaultRedirect} />
        </Routes>
      </SearchContext.Provider>
      <Outlet />
    </div>
  );
}