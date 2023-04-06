import styled from "styled-components";


export const SubscriptionCommunityStyled = styled.div`
    display: flex;
    align-items: cneter;
    justify-content: space-between;
    border-radius: 15px;
    padding: 15px;
    background: ${ props => props.theme.color.grey };
`;

export const SubscriptionCommunityTitleStyled = styled.div` 
    font-size: 18px;
`

export const SubscriptionCommunityDescriptionStyled = styled.div` 
    font-size: 14px;
`
