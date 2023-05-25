import styled from 'styled-components';


interface IMarginProps {
    mt?: Number,
    ml?: Number,
    mr?: Number,
    mb?: Number 
}

export const Margin = styled.div<IMarginProps>`
    margin-top: ${(props) => props.mt + 'px'};
    margin-right: ${(props) => props.mr + 'px'};
    margin-left: ${(props) => props.ml + 'px'};
    margin-bottom: ${(props) => props.mb + 'px'};
`;

Margin.defaultProps = {
    mt: 0,
    ml: 0,
    mr: 0,
    mb: 0 
};
