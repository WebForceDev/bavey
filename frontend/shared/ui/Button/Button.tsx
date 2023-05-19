import React, { ReactNode } from "react";

import ButtonStyled from './styled';


interface IButtonProps {
    onClick?: React.MouseEventHandler,
    children: string,
    fill?: boolean,
    danger?: boolean,
}

export const Button:React.FC<IButtonProps> = ({ children, onClick, fill, danger }) => {
    return (
        <ButtonStyled onClick={ onClick } danger={danger} fill={fill}>
            { children }
        </ButtonStyled>
    )
}

