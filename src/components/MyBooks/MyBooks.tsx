import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { apiUrl } from '../../config/api';
import { SearchContext } from '../../contexts/search.context';
import { AdBookEntity } from 'types';
import { TableBook } from '../TableBook/TableBook';
import { UserContext } from '../../contexts/user.context';

export const MyBooks = () => {
    const { search, setSearch } = useContext(SearchContext);
    const { userId, setUserId } = useContext(UserContext)
    const [loadPage, setLoadPage] = useState(1);
    const [books, setBooks] = useState<AdBookEntity[]>([]);
    const token: String | undefined = Cookies.get('token');

    const handleEditClick = (book: AdBookEntity) => {

        console.log('Edycja książki', book);
    };

    const handleAddClick = (book: AdBookEntity) => {

    };

    const handleDeleteClick = async (book: AdBookEntity) => {
        try {
            const response = await fetch(`${apiUrl}/user/${userId}/book/${book.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `${token}`,
                },
            });
            if (response.status === 200) {
                console.log('Książka została usunięta z bilbiteczki użytkownika.');
                setLoadPage((prevPage) => prevPage + 1);
            } else if (response.status === 404) {
                console.log('Książka nie została znaleziona.');
            } else {
                console.log('Błąd usuwania książki.');
            }
        } catch (error) {
            console.error('Błąd usuwania książki:', error);
        }
    };

    useEffect(() => {
        (async () => {
            const res = await fetch(`${apiUrl}/user/${userId}/books/${search}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
            });
            const data = await res.json();
            setBooks(data);
        })()
    }, [search, loadPage])

    return (
        <>
            <TableBook
                books={books}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
                onAddClick={handleAddClick}
            />
        </>

    );


};