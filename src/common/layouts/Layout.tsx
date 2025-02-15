import createCache from '@emotion/cache'
import { CacheProvider, css, Global, Theme } from '@emotion/react'
import { createTheme, CssBaseline, Theme as MuiTheme, ThemeProvider } from '@mui/material'
import { type i18n } from 'i18next'
import { ReactNode, StrictMode } from 'react'
import { I18nextProvider } from 'react-i18next'
import Header from './Header'

declare module '@emotion/react' {
  interface Theme extends MuiTheme {
  }
}

const theme = createTheme({
  typography: {
    button: {
      textTransform: 'none',
    },
  },
})

export const cache = createCache({ key: 'c', prepend: true })

interface Props {
  i18n: i18n
  isTopPage: boolean
  children: ReactNode
}

const Layout = ({ i18n, isTopPage, children }: Props) => {
  return (
    <StrictMode>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <CssBaseline />
            <Header isTopPage={isTopPage} />
            {children}
          </I18nextProvider>
        </ThemeProvider>
      </CacheProvider>
    </StrictMode>
  )
}

export default Layout
