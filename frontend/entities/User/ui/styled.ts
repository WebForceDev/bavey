import styled from "styled-components"


export const UserMiniStyled = styled.div`
    cursor: pointer;
    color: ${(props) => props.theme.color.grean};
    font-size: 18px;
    font-weight: 600;
`;

export const UserInfoStyled = styled.div`
    font-size: 20px;
   
`;

export const UserInfoTitleStyled = styled.h1`
    font-size: 32px;
`;

export const UserInfoTagStyled = styled.div`
    font-size: 24px;
    display: block;
    cursor: pointer;
    color: ${(props) => props.theme.color.grean};
    font-weight: 600;
`;

export const UserAvetarStyled = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`