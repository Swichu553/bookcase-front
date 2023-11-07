import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, Router } from 'react-router-dom';
import { LoginForm } from './components/LoginForm/LoginForm';
import { Main } from './components/Main/Main';
import { Header } from './components/Header/Header';
import { apiUrl } from './config/api';
import { SearchContext } from './contexts/search.context';
import { UserContext } from './contexts/user.context';
import Cookies from 'js-cookie';
import './App.css';

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [search, setSearch] = useState('');
  const [userId, setUserId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const token = Cookies.get('token');

  const handleLogin = async (username: string, password: string) => {
    setIsAuthenticated(false);
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
        const userId = data.userId;
        setUserId(userId);
        const token = data.token;
        setIsAuthenticated(true);
        // Token umieszczony w ciasteczku
        Cookies.set('token', token, { expires: 15 / (60 * 24) }); // 15 minut
      } else {
        setErrorMessage('Błąd logowania');
      }
    } catch (error) {
      setErrorMessage('Błąd logowania');
    }
  };

  const defaultRedirect = isAuthenticated ? <Navigate to="/my" /> : <Navigate to="/login" />;

  return (
    <div>
      <Header />
      <SearchContext.Provider value={{ search, setSearch }}>
        <UserContext.Provider value={{ userId, setUserId }}>
          <Routes>
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/my" />
                ) : (
                  <LoginForm onLogin={handleLogin} errorMessage={errorMessage} />
                )
              }
            />
            <Route
              path="/my"
              element={
                isAuthenticated ? <Main setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />
              }
            />
            <Route path="/*" element={defaultRedirect} />
          </Routes>
        </UserContext.Provider>
      </SearchContext.Provider>
      <Outlet />
    </div>
  );
};
