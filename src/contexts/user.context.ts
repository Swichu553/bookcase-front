import { createContext } from 'react';

export const UserContext = createContext({
    userId: '',
    setUserId: (s: string) => { }
});