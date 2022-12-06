import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');

  body {
    background: ${props => props.theme.color.bg};
    color: ${props => props.theme.color.white};
    font-family: 'Poppins', sans-serif;
  }
  a {
    color: ${props => props.theme.color.grean};
    text-decoration: none;
    font-size: 18px;
  }
`;

