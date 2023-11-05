import React, { useState } from 'react';
import { MyBooks } from '../MyBooks/MyBooks';
import { AllBooks } from '../AllBooks/AllBooks';
import { AddBook } from '../AddBook/AddBook';
import { Account } from '../Account/Account';
import Cookies from 'js-cookie';
import "./Main.css"
import { useNavigate } from 'react-router-dom';

export const Main = () => {
    const [selectedMenuItem, setSelectedMenuItem] = useState('Moje książki');
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('token');
        setSelectedMenuItem('Wyloguj');
        navigate('/login');
        window.location.reload();

    };

    const renderRightComponent = () => {
        switch (selectedMenuItem) {
            case 'Moje książki':
                return <MyBooks />;
            case 'Wszystkie książki':
                return <AllBooks />;
            case 'Dodaj książkę':
                return <AddBook />;
            case 'Konto':
                return <Account />;
            case 'Wyloguj':
                return null;
            default:
                return null;
        }
    };

    return (
        <div className="main-container">
            <div className="menu">
                <ul>
                    <li
                        className={selectedMenuItem === 'Moje książki' ? 'selected' : ''}
                        onClick={() => setSelectedMenuItem('Moje książki')}
                    >
                        Moje książki
                    </li>
                    <li
                        className={selectedMenuItem === 'Wszystkie książki' ? 'selected' : ''}
                        onClick={() => setSelectedMenuItem('Wszystkie książki')}
                    >
                        Wszystkie książki
                    </li>
                    <li
                        className={selectedMenuItem === 'Dodaj książkę' ? 'selected' : ''}
                        onClick={() => setSelectedMenuItem('Dodaj książkę')}
                    >
                        Dodaj książkę
                    </li>
                    <li
                        className={selectedMenuItem === 'Konto' ? 'selected' : ''}
                        onClick={() => setSelectedMenuItem('Konto')}
                    >
                        Konto
                    </li>
                    <li
                        className={selectedMenuItem === 'Wyloguj' ? 'selected' : ''}
                        onClick={handleLogout}>
                        Wyloguj
                    </li>
                </ul>
            </div>
            <div className="right-content">{renderRightComponent()}</div>
        </div>
    );
}