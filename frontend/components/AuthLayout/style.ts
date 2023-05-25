import styled from "styled-components";

import ButtonStyled from "../../styles/components/Button";


export const AuthFormStyled = styled.form`
    width: 365px;
    margin: auto;
`;

export const AuthLayoutStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-top: 65px;
`;

export const FormTitle = styled.h1`
    font-size: 48px;
    line-height: 72px;
    letter-spacing: -0.065em;
`

export const SubmitStyled = styled.input.attrs({type: 'submit'})`
    cursor: pointer;
    padding: 8px 37px;
    border: none;
    outline: none;
    border-radius: 8px;
    background: ${props => props.theme.color.grean};
    color: ${props => props.theme.color.grey};
    width: 100%;
    height: 50px;
    margin: auto;
    margin-top: 35px;
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-size: 18px;
    line-height: 27px;
`
