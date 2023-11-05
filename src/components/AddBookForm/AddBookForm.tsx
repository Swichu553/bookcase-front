import React, { useState } from 'react';
import { headerLabels } from '../../utils/HeaderLabes';
import { AdBookEntity } from 'types';

export const AddBookForm: React.FC = () => {
    const [isbn, setIsbn] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [publicationDate, setPublicationDate] = useState('');
    const [categories, setCategories] = useState('');
    const [rating, setRating] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();


        console.log('Dodano nową książkę:', {
            isbn,
            title,
            author,
            publisher,
            publicationDate,
            categories,
            rating,
            description,
        });

        setIsbn('');
        setTitle('');
        setAuthor('');
        setPublisher('');
        setPublicationDate('');
        setCategories('');
        setRating('');
        setDescription('');
    };

    return (
        <>
            <table className="book-table">
                <thead>
                    <tr>
                        {headerLabels.map((label, index) => (
                            <th key={index}>{label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="book-table">
                    <div onSubmit={handleSubmit}>
                        <input type="text" placeholder="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
                        <input type="text" placeholder="Tytuł" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <input type="text" placeholder="Autor" value={author} onChange={(e) => setAuthor(e.target.value)} />
                        <input type="text" placeholder="Wydawca" value={publisher} onChange={(e) => setPublisher(e.target.value)} />
                        <input type="text" placeholder="Data publikacji" value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} />
                        <input type="text" placeholder="Kategorie" value={categories} onChange={(e) => setCategories(e.target.value)} />
                        <input type="text" placeholder="Ocena" value={rating} onChange={(e) => setRating(e.target.value)} />
                        <input type="text" placeholder="Opis" value={description} onChange={(e) => setDescription(e.target.value)} />
                        <button type="submit">Dodaj książkę</button>
                    </div>
                </tbody>
            </table>

        </>

    );
};