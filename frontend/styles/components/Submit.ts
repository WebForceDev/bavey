import styled from "styled-components"


export const SubmitStyled = styled.input.attrs({type: 'submit'})`
    cursor: pointer;
    padding: 8px 37px;
    border: none;
    outline: none;
    border-radius: 8px;
    background: ${props => props.theme.color.grean};
    color: ${props => props.theme.color.grey};
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    line-height: 27px;
    width: 200px
`