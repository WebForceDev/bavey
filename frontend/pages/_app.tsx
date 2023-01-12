import type { AppProps } from 'next/app'
import { Normalize } from 'styled-normalize';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '../styles/globalStyle.styled';
import { AuthProvider } from '../providers/AuthProviders';
import theme from '../styles/theme';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme} >
        <Normalize />
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default MyApp
