import type { AppProps } from 'next/app'
import { Normalize } from 'styled-normalize';
import GlobalStyle from '../styles/globalStyle.styled';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Normalize />
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
