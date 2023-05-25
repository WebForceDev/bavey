import styled, { css } from "styled-components";


export const UserAccauntStyled = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    user-select: none;
`;

interface IDroppedMenu {
    isOpen: boolean
}

export const DroppedMenu  = styled.div<IDroppedMenu>`
    display: none;
    ${(props) => props.isOpen && css`
        display: block;
        position: absolute;
        top: 45px;
        right: 0;
        width: 230px;
        min-height: 200px;
        background: ${props => props.theme.color.black};
        border-radius: 15px;
        border: 2px solid ${props => props.theme.color.grey};
        box-shadow: 0px 0px 7px -5px rgba(0, 0, 0, 0.6);
        padding: 15px;
    `}
`;
