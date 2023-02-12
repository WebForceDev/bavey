import type { AppProps } from 'next/app'
import { Normalize } from 'styled-normalize';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import GlobalStyle from '../styles/globalStyle.styled';
import { AuthProvider } from '../providers/AuthProviders';
import { store } from '../redux/store';
import theme from '../styles/theme';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider theme={theme} >
          <Normalize />
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  )
}

export default MyApp
