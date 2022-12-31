import styled from 'styled-components';


interface IFlexStyledProps {
    justifyContent: string,
    alignItems: string
}

const FlexStyled = styled.div<IFlexStyledProps>`
    display: flex;
    justify-content: ${props => props.justifyContent};
    align-items: ${props => props.alignItems};
`;

export default FlexStyled;
