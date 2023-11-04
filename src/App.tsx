import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { LoginForm } from './components/LoginForm/LoginForm';
import { MyBooks } from './components/MyBooks/MyBooks';
import { Header } from './components/Header/Header';
import { apiUrl } from './config/api';
import './App.css';
//import Cookies from 'js-cookie';

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //const token = Cookies.get('token');
  const handleLogin = async (username: string, password: string) => {
    if (false) {
      setIsAuthenticated(true);
    } else {
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
          // Token umieszczony w ciasteczku
          //  Cookies.set('token', token, { expires: 15 / (60 * 24) }); // 15 minut

        } else {
          console.error('Login failed.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  }


  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/mybooks" /> : <LoginForm onLogin={handleLogin} />
          }
        />
        <Route
          path="/mybooks"
          element={isAuthenticated ? <MyBooks /> : <Navigate to="/login" />}
        />
        <Route index element={<Navigate to="/login" />} />
      </Routes>
      <Outlet />
    </div>
  );
}