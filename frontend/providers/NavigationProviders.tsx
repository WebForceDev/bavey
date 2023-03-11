import React, { createContext, useState, useContext } from 'react';



interface INavigationContext {
    activePage: string|null,
    setActivePage: Function
};

const NavigationContext = createContext<INavigationContext | null>(null)

interface INavigatioProviderProps {
    children: any
}

export const NavigationProvider: React.FC<INavigatioProviderProps> = ({ children }) => {
    const [activePage, setActivePage] = useState('')

	return <NavigationContext.Provider value={{activePage, setActivePage}}>
		{ children }
	</NavigationContext.Provider>
};

export const useNavigation = () => useContext(NavigationContext);
