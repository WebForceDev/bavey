import { IViewer } from "@entities/viewer/model/types";


const VIEWER_KEY = 'viewer';

export function existsVieweInStorage(): Boolean {
    if (process.browser) {
        if (localStorage.getItem(VIEWER_KEY) !== null) {
            return true;
        } else {
            return false;
        }
    }
    return false;
}

export function getViewerFromStorage(): IViewer {
    let viewer;
    if (process.browser) {
        if(existsVieweInStorage()) {
            viewer = localStorage.getItem(VIEWER_KEY) as string;
            viewer = JSON.parse(viewer);
        }
    }
    return viewer as IViewer;
}

export function setViewerInStorage(viewer: IViewer) {
    if (process.browser) {
        localStorage.setItem(VIEWER_KEY, JSON.stringify(viewer) );
    }
}

export function removeViewerFromStorage(viewer: IViewer) {
    if (process.browser) {
        localStorage.removeItem('VIEWER_KEY')
    }
}
