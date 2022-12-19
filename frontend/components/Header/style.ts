import styled from 'styled-components';


const HeaderStyled = styled.header`
    position: fixed;
    z-index: 5;
    top: 0;
    width: 100%;
    background: ${props => props.theme.color.black};
    padding: 15px 0px 15px 0px;
`;

export default HeaderStyled;