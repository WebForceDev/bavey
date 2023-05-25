import styled from "styled-components";


export const HeaderStyled = styled.header`
    background: ${(props) => props.theme.color.black};
    padding: 20px;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 5;
`;
