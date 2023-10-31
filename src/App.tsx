import React from 'react';
import './App.css';
import { LoginForm } from './components/LoginForm/LoginForm';

export const App = () => {
  const handleLogin = (username: string, password: string) => {

    console.log(`Logging in with username: ${username} and password: ${password}`);
  }
  return (
    <>
      <LoginForm onLogin={handleLogin} />
    </>
  );
}
