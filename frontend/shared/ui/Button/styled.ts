import styled, {css} from 'styled-components';


interface IButtonStyledProps {
    fill?: boolean,
    danger?: boolean,
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
    ${(props) => props.danger && css`
        border: 3px solid ${props => props.theme.color.red};
        color: ${props => props.theme.color.red};
    `}
    ${(props) => props.danger && props.fill && css`
        border: 3px solid ${props => props.theme.color.red};
        background: ${props => props.theme.color.red};
        color: ${props => props.theme.color.grey};
    `}
`;

export default ButtonStyled;
