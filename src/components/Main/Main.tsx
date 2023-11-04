import React, { useState } from 'react';
import { Header } from '../Header/Header';
import { MyBooks } from '../MyBooks/MyBooks';
import { AllBooks } from '../AllBooks/AllBooks';
import { AddBook } from '../AddBook/AddBook';
import { Account } from '../Account/Account';

function Main() {
    const [selectedMenuItem, setSelectedMenuItem] = useState('Moje książki');

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
                </ul>
            </div>
            <div className="right-content">{renderRightComponent()}</div>
        </div>
    );
}