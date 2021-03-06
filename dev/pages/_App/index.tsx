import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import theme from '../../theme'
import { UiGlobalStylesDev } from './styles/GlobalStyle'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <UiGlobalStylesDev />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default App
