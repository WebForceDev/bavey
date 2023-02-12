import styled from "styled-components";


export const ProfileHeaderStyled = styled.div`
    margin-top: 60px;
    background: ${props => props.theme.color.grey};
`;

export const ProfileHeaderBackground= styled.div`
    background-color: #000;
    width: 100%;
    height: 180px;
`;

export const ProfileTitle = styled.div`
    position: relative;
    top: -57px;
`;

export const UserName = styled.h1`
    font-weight: 700;
    font-size: 32px;
    line-height: 30px;
`;
