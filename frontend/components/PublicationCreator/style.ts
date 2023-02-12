import styled from "styled-components";


export const PublicationCreatorStyled = styled.form`
    background: ${(props) => props.theme.color.grey};
    border-radius: 16px;
    padding: 20px 40px;
    display: flex;
    flex-direction: column;
`;

export const PublicationInput = styled.input`
    background: ${(props) => props.theme.color.grey};
    color: ${(props) => props.theme.color.white};
    font-weight: 400;
    font-size: 18px;
    line-height: 19px;
    outline: none;
    border: none;
    &::placeholder {
        color: #D7D7D7;
    }
`;

export const PublicationButton = styled.input.attrs({type: 'submit'})`
    width: 100px;
    background: ${(props) => props.theme.color.grean};
    padding: 8px 18px;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    outline: none;
    border: none;
    border-radius: 15px;
    cursor: pointer;
`
