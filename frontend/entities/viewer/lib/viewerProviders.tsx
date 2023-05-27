import React, { createContext, useState, useContext } from 'react';

import { IViewer } from "../model/types";
import { getViewerFromStorage, setViewerInStorage } from '@shared/lib';


interface AppViewerInterface {
    authViewer: IViewer,
    setAuthViewer: Function,
};

const ViewerContext = createContext<AppViewerInterface | null>(null)

interface IViewerProps {
    children: any
}

export const ViewerContextProvider: React.FC<IViewerProps> = ({ children }) => {
    let authViewerFromStorage = getViewerFromStorage();
	const [authViewer, setAuthViewer] = useState(authViewerFromStorage)

    const setAuthViewerContext = (viewer: IViewer) => {
        setViewerInStorage(viewer);
        setAuthViewer(viewer);
    }

	return <ViewerContext.Provider value={{authViewer, setAuthViewer: setAuthViewerContext}}>
		{ children }
	</ViewerContext.Provider>
};

export const useViewer = () => useContext(ViewerContext);
