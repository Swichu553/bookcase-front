import React, { useState } from 'react';
import './LoginForm.css';

interface LoginFormProps {
    onLogin: (username: string, password: string) => void;
    errorMessage: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, errorMessage }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(username, password);
    };

    const containerStyle: React.CSSProperties = {
        boxShadow: errorMessage ? '0 0 10px 2px red'
            : 'n 0 0 10px rgba(255, 139, 139, 0.2)one',
    };

    return (
        <div className="login-container">
            <div className="login-form" style={containerStyle}>
                <h2>Login</h2>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <button type="submit">Log In</button>
                </form>
            </div>
        </div>
    );
};