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
    const [books, setBooks] = useState<AdBookEntity[]>([]);
    const token: String | undefined = Cookies.get('token');

    const handleEditClick = (book: AdBookEntity) => {

        console.log('Edycja książki', book);
    };

    const handleAddClick = (book: AdBookEntity) => {

    };

    const handleDeleteClick = (book: AdBookEntity) => {

        console.log('Usuwanie książki', book);
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
    }, [search])

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