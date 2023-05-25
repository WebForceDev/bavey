import styled from 'styled-components';


interface ITwoColumnGridProps {
    firstColumnSize?: string,
    secondColumnSize?: string,
    gridGap?: string
}

export const TwoColumnGrid = styled.div<ITwoColumnGridProps>`
    display: grid;
    grid-template-columns: ${(props) => props.firstColumnSize + ' ' + props.secondColumnSize};
    grid-gap: ${(props) => props.gridGap};
    align-items: start;
`;

TwoColumnGrid.defaultProps = {
    firstColumnSize: '1fr',
    secondColumnSize: '1fr',
    gridGap: '10px'
};
