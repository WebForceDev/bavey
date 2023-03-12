import styled, { css } from "styled-components";


export const ToggleListTitleStyled = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 18px;
    cursor: pointer;
`;

interface IToggleListItemStyledProps {
    isOpen: boolean
}

export const ToggleListItemsStyled = styled.div<IToggleListItemStyledProps>`
    display: block;

    ${(props) => props.isOpen && css`
        display: none;
    `}
`;

export const ToggleListItemStyled = styled.li`
    font-size: 18px;
    cursor: pointer;
    margin-top: 8px;
    list-style: none;
`;
