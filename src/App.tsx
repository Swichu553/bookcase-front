import React, { useState } from 'react';
import { BrowserRouter, Route, } from 'react-router-dom';
import { LoginForm } from './components/LoginForm/LoginForm';
import { apiUrl } from './config/api';
import './App.css';
import { MyBooks } from './components/MyBooks/MyBooks';

export const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogin = async (username: string, password: string) => {
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
        // tokken umieszczony w cookie
        document.cookie = `token=${token}; max-age=900`; // Token ważny przez 15 minut

      } else {
        console.error('Login failed.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  return (
    <BrowserRouter>
      <div>
        <h1>My App</h1>
        <Route path="/login">
          {isAuthenticated ? (
            <Route path="/mybooks" />
          ) : (
            <LoginForm onLogin={handleLogin} />
          )}
        </Route>
        <Route path="/mybooks">
          {isAuthenticated ? (
            <MyBooks />
          ) : (
            <Route path="/login" />
          )}
        </Route>
      </div>
    </BrowserRouter>
  );
}
