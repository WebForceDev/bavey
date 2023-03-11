import React from 'react';

import { NavigationSideBarStyled } from './styled';


interface INavigationSideBarProps {
    children: any,
}

const NavigationSideBar: React.FC<INavigationSideBarProps> = ({ children }) => {
    return (
        <NavigationSideBarStyled>
                { children }
        </NavigationSideBarStyled>
    )
};

export default NavigationSideBar;
