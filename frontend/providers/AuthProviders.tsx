import React, { createContext, useState, useContext } from 'react';

import { IUser } from "../types/user";


interface AppContextInterface {
    token: string | null,
    setToken: Function,
    user: IUser | null
};

const AuthContext = createContext<AppContextInterface | null>(null)

interface IAuthProviderProps {
    children: any
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
	const [token, setToken] = useState(null)

	return <AuthContext.Provider value={{token, setToken, user: null}}>
		{ children }
	</AuthContext.Provider>
};

export const useAuth = () => useContext(AuthContext);
