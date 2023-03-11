import type { AppProps } from 'next/app'
import { Normalize } from 'styled-normalize';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import GlobalStyle from '../styles/globalStyle.styled';
import { AuthProvider } from '../providers/AuthProviders';
import { NavigationProvider } from '../providers/NavigationProviders';
import { store } from '../redux/store';
import theme from '../styles/theme';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider theme={theme} >
          <NavigationProvider>
            <Normalize />
            <GlobalStyle />
            <Component {...pageProps} />
          </NavigationProvider>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  )
}

export default MyApp
