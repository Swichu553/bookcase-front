import React from 'react';

interface Book {
    id: string;
    isbn: string;
    title: string;
    author: string;
    publisher: string;
    publicationDate: Date;
    categories: string;
    rating: string;
    description: string;
}

interface TableBookProps {
    books: Book[];
    onEditClick: (book: Book) => void;
    onDeleteClick: (book: Book) => void;
}

export const TableBook: React.FC<TableBookProps> = ({ books, onEditClick, onDeleteClick }) => {
    const headerLabels = [
        'ISBN',
        'Tytuł',
        'Autor',
        'Wydawca',
        'Data publikacji',
        'Kategorie',
        'Ocena',
        'Opis',
        'Akcje',
    ];

    return (
        <table className="book-table">
            <thead>
                <tr>
                    {headerLabels.map((label, index) => (
                        <th key={index}>{label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {books.map((book) => (
                    <tr key={book.id}>
                        <td>{book.isbn}</td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.publisher}</td>
                        <td>{book.publicationDate.toLocaleDateString()}</td>
                        <td>{book.categories}</td>
                        <td>{book.rating}</td>
                        <td>{book.description}</td>
                        <td>
                            <button className="edit-button" onClick={() => onEditClick(book)}>
                                Edit
                            </button>
                            <button className="delete-button" onClick={() => onDeleteClick(book)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};