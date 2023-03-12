import React, { createContext, useState, useContext } from 'react';

import { IUser } from "../types/user";


interface IAuthUser {
    token: string | null,
    username: string | null
}

interface AppContextInterface {
    authUser: IAuthUser,
    setAuthUser: Function,
};

const AuthContext = createContext<AppContextInterface | null>(null)

interface IAuthProviderProps {
    children: any
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    let authUserFromStorage: IAuthUser = {token: null, username:null};
    if (typeof localStorage !== 'undefined') {
        if (localStorage.getItem("authUser") != null) {
            authUserFromStorage = JSON.parse(localStorage.getItem('authUser'));
        }
    }
	const [authUser, setAuthUser] = useState(authUserFromStorage)

    const setAuthUserContext = (token:string, username:string) => {
        const authUser:IAuthUser = {token: token, username: username}
        setAuthUser(authUser);
        localStorage.setItem('authUser', JSON.stringify(authUser) );
    }

	return <AuthContext.Provider value={{authUser, setAuthUser: setAuthUserContext}}>
		{ children }
	</AuthContext.Provider>
};

export const useAuth = () => useContext(AuthContext);
