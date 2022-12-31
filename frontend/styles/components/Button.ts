import styled, {css} from 'styled-components';


interface IButtonStyledProps {
    fill?: boolean
}

const ButtonStyled = styled.button<IButtonStyledProps>`
    cursor: pointer;
    padding: 8px 37px;
    border: none;
    outline: none;
    border-radius: 8px;
    background: none;
    color: ${props => props.theme.color.grean};
    border: 2px solid ${props => props.theme.color.grean};

    ${(props) => props.fill && css`
        background: ${props => props.theme.color.grean};
        color: ${props => props.theme.color.grey};
  `}
`;

export default ButtonStyled;