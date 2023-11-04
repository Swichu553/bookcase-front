import React from 'react';
import './MyBooks.css';
import { apiUrl } from '../../config/api';


export const MyBooks = () => {
    // const respons = async () => {
    //     try {
    //         const response = await fetch(`${apiUrl}/search`)
    //         const books = await response.json();
    //     } catch (e) {

    //     }
    // }

    const books = [
        { name: 'Książka 1', author: 'Autor 1' },
        { name: 'Książka 2', author: 'Autor 2' },
        { name: 'Książka 3', author: 'Autor 3' },
    ];

    return (
        <div>
            <h2>Moje Książki</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nazwa Książki</th>
                        <th>Autor</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={index}>
                            <td>{book.name}</td>
                            <td>{book.author}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
}