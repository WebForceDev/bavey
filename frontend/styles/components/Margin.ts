import styled from 'styled-components';


interface IMarginProps {
    mg: string 
}

const Margin = styled.div<IMarginProps>`
    margin: ${(props) => props.mg};
`;

export default Margin;
