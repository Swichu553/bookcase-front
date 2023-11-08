import React, { SyntheticEvent, useContext, useState } from 'react';
import { SearchContext } from '../../contexts/search.context';
import { headerLabels } from '../../utils/HeaderLabes';
import { AdBookEntity } from 'types';
import './TableBook.css';


interface TableBookProps {
    books: AdBookEntity[];
    onEditClick: (book: AdBookEntity) => void;
    onDeleteClick: (book: AdBookEntity) => void;
    onAddClick: (book: AdBookEntity) => void;

}

export const TableBook: React.FC<TableBookProps> = ({ books, onEditClick, onDeleteClick, onAddClick }) => {

    const { search, setSearch } = useContext(SearchContext);
    const [inputVal, setInputVal] = useState(search);
    const [selectedDescription, setSelectedDescription] = useState<string | null>(null);


    const setSearchFromLocalState = (e: SyntheticEvent) => {
        e.preventDefault();
        setSearch(inputVal);
    }

    const setResetSearch = (e: SyntheticEvent) => {
        e.preventDefault();
        setSearch("");
        setInputVal("");
    }

    const convertDate = (date: Date) => {
        return new Date(date).toLocaleDateString();
    };


    const sortBooks = (books: AdBookEntity[]) => {
        return ([...books].sort((a, b) => a.title.localeCompare(b.title)));
    };

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
                {sortBooks(books).map((book) => (
                    <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.isbn}</td>
                        <td>{book.author}</td>
                        <td>{book.publisher}</td>
                        <td>{book.publicationDate ? convertDate(book.publicationDate) : 'Brak daty'}</td>
                        <td>{book.categories}</td>
                        <td>{book.rating}</td>
                        <td>
                            <div onClick={() => setSelectedDescription(book.description)}>
                                <textarea
                                    className="description-textarea"
                                    value={book.description ? 'Opis' : ''}
                                    readOnly
                                />
                            </div>

                        </td>
                        <td>
                            <button className="edit-button" onClick={() => onEditClick(book)}>
                                Edit
                            </button>
                            <button className="delete-button" onClick={() => onDeleteClick(book)}>
                                ❌
                            </button>
                            <button className="add-button" onClick={() => onAddClick(book)}>
                                ➕
                            </button>
                        </td>
                    </tr>
                ))}
                {selectedDescription && (
                    <div className="description-popup">
                        <div className="popup-content">
                            <div className="popup-description">
                                {selectedDescription}
                                <p>
                                    <button className="close-button" onClick={() => setSelectedDescription(null)}>
                                        Zamknij
                                    </button>
                                </p>
                            </div>

                        </div>
                    </div>
                )}
            </tbody>
        </table>

    );

};