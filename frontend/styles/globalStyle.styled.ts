import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    background: ${props => props.theme.color.bg};
    color: ${props => props.theme.color.white}
  }
`;

