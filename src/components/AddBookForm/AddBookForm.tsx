import React, { useState, useEffect } from 'react';
import { headerLabels } from '../../utils/HeaderLabes';
import { AdBookEntity } from 'types';
import { apiUrl } from '../../config/api';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const AddBookForm: React.FC<{ isBookAdded: boolean; setIsBookAdded: (value: boolean) => void }> = ({
    isBookAdded,
    setIsBookAdded,
}) => {
    const [book, setBook] = useState({
        title: '',
        isbn: '',
        author: '',
        publisher: '',
        publicationDate: new Date(),
        categories: '',
        rating: '',
        description: '',
    } as AdBookEntity);

    const [categories, setCategories] = useState<string[]>([]);
    const [isbnError, setIsbnError] = useState('');
    const token: String | undefined = Cookies.get('token');
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${apiUrl}/categorie/search`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`,
                    },
                });
                const data = await res.json();
                const categoryNames = data.map((category: { name: string }) => category.name);
                setCategories(categoryNames);
            } catch (error) {
                console.error('Błąd podczas pobierania kategorii:', error);
            }
        })();
    }, [token]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'isbn') {
            const isbnRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]{13}$/;

            if (value === '' || isbnRegex.test(value)) {
                setIsbnError('');
            } else {
                setIsbnError('Błędny numer ISBN');
            }
        }

        setBook({
            ...book,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isbnError) {
            return;
        }

        const res = await fetch(`${apiUrl}/book/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            body: JSON.stringify({
                ...book,
            }),
        });

        if (res.status === 200) {
            setIsBookAdded(true);
        }
    };

    return (
        <div className="book-form-container">
            <table className="book-table">
                <thead>
                    <tr>
                        {headerLabels.map((label, index) => (
                            <th key={index}>{label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input
                                type="text"
                                name="title"
                                placeholder="Tytuł"
                                value={book.title}
                                onChange={handleInputChange}
                                required
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="isbn"
                                placeholder="ISBN"
                                value={book.isbn}
                                onChange={handleInputChange}
                                required
                            />
                            {isbnError && <div className="error-message">{isbnError}</div>}
                        </td>
                        <td>
                            <input
                                type="text"
                                name="author"
                                placeholder="Autor"
                                value={book.author}
                                onChange={handleInputChange}
                                required
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="publisher"
                                placeholder="Wydawca"
                                value={book.publisher}
                                onChange={handleInputChange}
                                required
                            />
                        </td>
                        <td>
                            <input
                                type="Date"
                                name="publicationDate"
                                placeholder="Data publikacji"
                                value={new Date(book.publicationDate).toISOString()}
                                onChange={handleInputChange}
                                required
                            />
                        </td>
                        <td>
                            <select
                                name="categories"
                                value={book.categories}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Wybierz kategorie</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <input
                                type="Number"
                                name="rating"
                                placeholder="Ocena"
                                value={book.rating}
                                onChange={handleInputChange}
                                required
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="description"
                                placeholder="Opis"
                                value={book.description}
                                onChange={handleInputChange}
                                required
                            />
                        </td>
                        <td>
                            <button type="submit" onClick={handleSubmit}>
                                Dodaj książkę
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
