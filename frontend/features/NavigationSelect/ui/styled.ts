import styled, { css } from "styled-components";


interface IPropsNavigationBlockStyled {
    isOpen: boolean
}

export const NavigationBlockStyled = styled.div<IPropsNavigationBlockStyled>`
    padding: 10px;
    width: 200px;
    position: absolute;
    top: 15px;
    border-radius: 15px;
    box-sizing: border-box;
    border: 2px solid ${props => props.theme.color.grey };
    background: ${props => props.theme.color.black };

    img {
        transition: .1s;
        transform: rotate(-90deg);
        user-select: none;
    }
    
    ${(props) => props.isOpen && css`
        height: 300px;
        box-shadow: 0px 0px 7px -5px rgba(0, 0, 0, 0.6);
        border: 2px solid ${props => props.theme.color.grey };
        img {
            transform: rotate(0deg);
            transition: .1s;
        }
    `}
`;

export const NavigationBlockTitleStyled = styled.div`
    user-select: none;
    font-weight: 300px;
`
