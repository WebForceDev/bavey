import type { AppProps } from 'next/app'
import { Normalize } from 'styled-normalize';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import GlobalStyle from '../styles/globalStyle.styled';
import { NavigationProvider } from '../providers/NavigationProviders';
import { wrapper } from '../redux/store';
import theme from '../styles/theme';
import { ViewerContextProvider } from '@entities/viewer';


function MyApp({ Component, ...rest  }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <Provider store={store}>
      <ViewerContextProvider>
        <ThemeProvider theme={theme} >
          <NavigationProvider>
            <Normalize />
            <GlobalStyle />
            <Component {...pageProps} />
          </NavigationProvider>
        </ThemeProvider>
      </ViewerContextProvider>
    </Provider>
  )
}

export default wrapper.withRedux(MyApp);
