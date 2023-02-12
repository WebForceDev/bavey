import React, { createContext, useState, useContext } from 'react';

import { IUser } from "../types/user";


interface AppContextInterface {
    token: string|null,
    setToken: Function,
    user: IUser | null
};

const AuthContext = createContext<AppContextInterface | null>(null)

interface IAuthProviderProps {
    children: any
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    let tokenString: string|null = '';
    if (typeof localStorage !== 'undefined') {
        tokenString = localStorage.getItem('token');
    }
	const [token, setToken] = useState(tokenString)

    const setTokenContext = (token:string) => {
        setToken(token);
        localStorage.setItem('token', token);
    }

	return <AuthContext.Provider value={{token, setToken: setTokenContext, user: null}}>
		{ children }
	</AuthContext.Provider>
};

export const useAuth = () => useContext(AuthContext);
