import styled from "styled-components";


export const RelationStyled = styled.div`
    display: flex;
    align-items: center;
    background: ${(props) => props.theme.color.grey};
    padding: 15px;
    border-radius: 30px;
    margin-bottom: 30px;
`;

export const UserName = styled.div`
    a {
        font-size: 24px;
        color: ${(props) => props.theme.color.white};
        font-weight: 700;
    }
`

export const UserSendMessage = styled.div`
    a {
        font-size: 18px;
        margin-top: 8px;
        display: block;
    }
`

export const UserInfo = styled.div`
    margin-left: 30px;
`;
