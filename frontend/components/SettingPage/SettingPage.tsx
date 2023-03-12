import React from "react";

import { SettingsPageStyled } from './styled';


interface ISettingsPageProps {
    children: any
}

const SettingsPage: React.FC<ISettingsPageProps> = ({ children }) => {
    return (
        <SettingsPageStyled>
            { children }
        </SettingsPageStyled>
    )
}

export default SettingsPage;
