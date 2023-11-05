import React, { SyntheticEvent, useContext, useState } from 'react';
import { AdBookEntity } from 'types';
import { SearchContext } from '../../contexts/search.context';
import './TableBook.css';


interface TableBookProps {
    books: AdBookEntity[];
    onEditClick: (book: AdBookEntity) => void;
    onDeleteClick: (book: AdBookEntity) => void;
}

export const TableBook: React.FC<TableBookProps> = ({ books, onEditClick, onDeleteClick }) => {

    const { search, setSearch } = useContext(SearchContext);
    const [inputVal, setInputVal] = useState(search);

    const setSearchFromLocalState = (e: SyntheticEvent) => {
        e.preventDefault();
        setSearch(inputVal);
    }

    const setResetSearch = (e: SyntheticEvent) => {
        e.preventDefault();
        setSearch("");
        setInputVal("");
    }


    const headerLabels = [
        'Tytuł',
        'ISBN',
        'Autor',
        'Wydawca',
        'Data publikacji',
        'Kategorie',
        'Ocena',
        'Opis',
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
                <div className="search">
                    <input
                        className="search-input"
                        type="text"
                        value={inputVal}
                        onChange={e => setInputVal(e.target.value)}
                        onKeyUp={(e) => {
                            if (e.key === "Enter") {
                                setSearchFromLocalState(e);
                            }
                        }}
                    />
                    <button className="search-button" onClick={setSearchFromLocalState}>Szukaj</button>
                    <button className="reset-button" onClick={setResetSearch}>Reset</button>
                </div>
                {books.map((book) => (
                    <tr key={book.id}>
                        <td>{book.isbn}</td>
                        <td>{book.title}</td>
                        <td>{book.authorId}</td>
                        <td>{book.publisher}</td>
                        <td>{book.publicationDate ? book.publicationDate.toString() : 'Brak daty'}</td>
                        <td>{book.categoriesId}</td>
                        <td>{book.rating}</td>
                        <td>{book.description}</td>
                        <td>
                            <button className="edit-button" onClick={() => onEditClick(book)}>
                                Edit
                            </button>
                            <button className="delete-button" onClick={() => onDeleteClick(book)}>
                                ❌
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table >
    );
};