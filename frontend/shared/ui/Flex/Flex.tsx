import styled from 'styled-components';


interface IFlexProps {
    justifyContent: string,
    alignItems: string,
    flexDirection?: string,
}

export const Flex = styled.div<IFlexProps>`
    display: flex;
    justify-content: ${props => props.justifyContent};
    align-items: ${props => props.alignItems};
    flex-direction: ${props => props.flexDirection};
`;

Flex.defaultProps = {
    flexDirection: 'row',
};
