import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { MyBooks } from '../MyBooks/MyBooks';
import { AllBooks } from '../AllBooks/AllBooks';
import { AddBookForm } from '../AddBookForm/AddBookForm';
import { Account } from '../Account/Account';
import { useNavigate } from 'react-router-dom';
import { ErrorView } from '../ErrorView/ErrorView';
import "./Main.css"

interface Props {
    setIsAuthenticated: (value: boolean) => void;
};

export const Main: React.FC<Props> = ({ setIsAuthenticated }) => {
    const [selectedMenuItem, setSelectedMenuItem] = useState('Moje książki');
    const [isBookAdded, setIsBookAdded] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('token');
        setIsAuthenticated(false);
        setSelectedMenuItem('Wyloguj');
        navigate('/login');
    };

    useEffect(() => {
        if (isBookAdded) {
            setSelectedMenuItem('Wszystkie książki');
        }
    }, [isBookAdded, navigate]);

    const renderRightComponent = () => {
        if (errorMessage) {
            return <ErrorView message={errorMessage} />;
        }

        switch (selectedMenuItem) {
            case 'Moje książki':
                return <MyBooks />;
            case 'Wszystkie książki':
                return <AllBooks selectedMenuItem={selectedMenuItem} setSelectedMenuItem={setSelectedMenuItem} />;
            case 'Dodaj książkę':
                return <AddBookForm isBookAdded={isBookAdded} setIsBookAdded={setIsBookAdded} />;
            case 'Konto':
                return <Account />;
            case "Error":
                return <ErrorView message={errorMessage} />;
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
                        onClick={handleLogout}
                    >
                        Wyloguj
                    </li>
                </ul>
            </div>
            <div className="right-content">{renderRightComponent()}</div>
        </div>
    );
};
