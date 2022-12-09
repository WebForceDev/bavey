import styled from 'styled-components';


export const BoardStyled = styled.div`
    background: ${props => props.theme.color.grey};
    padding: 20px 25px;
    border-radius: 16px;
    max-width: 260px;
`;

export const BoardTitleStyled = styled.div`
    font-weight: 700;
    font-size: 18px;
`;
