import styled, { css } from "styled-components";


interface ILinkWithIconStyledProps {
    isActive: boolean
}

export const LinkWithIconStyled = styled.div<ILinkWithIconStyledProps>`
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    width: 100%;

    ${(props) => props.isActive && css`
        color: ${props => props.theme.color.grean};
    `}
`;

export const LinkWithIconTextStyled = styled.div`
    margin-left: 14px;
    font-weight: 300;
    font-size: 18px;
`;
