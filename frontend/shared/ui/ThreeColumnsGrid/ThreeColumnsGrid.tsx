import styled from 'styled-components';

interface IThreeColumnGridProps {
    firstColumnSize?: string,
    secondColumnSize?: string,
    thirdColumnsSize?: string,
    gridGap?: string
}

export const ThreeColumnGrid = styled.div<IThreeColumnGridProps>`
    display: grid;
    grid-template-columns: ${(props) => {
        let gridTemplate = props.firstColumnSize;
        gridTemplate += ' ' +  props.secondColumnSize;
        gridTemplate += ' ' +  props.thirdColumnsSize;
        return gridTemplate;
    }};
    grid-gap: 15px;
    align-items: start;
`;

ThreeColumnGrid.defaultProps = {
    firstColumnSize: '1fr',
    secondColumnSize: '1fr',
    thirdColumnsSize: '1fr',
    gridGap: '10px'
};
