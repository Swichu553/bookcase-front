import React from 'react';
import './App.css';
import { LoginForm } from './components/LoginForm/LoginForm';
import { apiUrl } from './config/api';

export const App = () => {
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
    <>
      <LoginForm onLogin={handleLogin} />
    </>
  );
}
