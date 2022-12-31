import type { AppProps } from 'next/app'
import { Normalize } from 'styled-normalize';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '../styles/globalStyle.styled';
import theme from '../styles/theme';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme} >
      <Normalize />
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
