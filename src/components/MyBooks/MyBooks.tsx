import React from 'react';
import './MyBooks.css';


export const MyBooks = () => {
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