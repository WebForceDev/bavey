import styled, { css } from "styled-components";


export const DropDownSelectTitleStyled = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 18px;
    cursor: pointer;
`;

interface IDropDownSelectItemStyledProps {
    isOpen: boolean
}

export const DropDownSelectItemsStyled = styled.div<IDropDownSelectItemStyledProps>`
    display: block;

    ${(props) => props.isOpen && css`
        display: none;
    `}
`;

export const DropDownSelectItemStyled = styled.li`
    font-size: 18px;
    cursor: pointer;
    margin-top: 8px;
    list-style: none;
`;

