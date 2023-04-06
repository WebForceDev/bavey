import type { AppProps } from 'next/app'
import { Normalize } from 'styled-normalize';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '../styles/globalStyle.styled';
import { AuthProvider } from '../providers/AuthProviders';
import { NavigationProvider } from '../providers/NavigationProviders';
import { wrapper } from '../redux/store';
import theme from '../styles/theme';
import { Provider } from 'react-redux';


function MyApp({ Component, ...rest  }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

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

export default wrapper.withRedux(MyApp);
