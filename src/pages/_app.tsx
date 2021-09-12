import { createTheme, Theme as MuiTheme, ThemeProvider } from '@mui/material'
import { AppProps } from 'next/app'
import React from 'react'
import { RecoilRoot } from 'recoil'

require('react-image-crop/dist/ReactCrop.css')

declare module '@emotion/react' {
  interface Theme extends MuiTheme {
  }
}

const theme = createTheme({})

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  )
}
