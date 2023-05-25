import styled, { css } from 'styled-components';


interface ITextAfterIconProps {
    isAcrive: boolean
}

export const TextAfterIcon = styled.div<ITextAfterIconProps>`
    font-size: 18px;
    font-weight: 400;
    margin-left: 8px;

    ${(props) => props.isAcrive && css`
        color: ${props => props.theme.color.grean};
  `}
`;
