import createCache from '@emotion/cache'
import { CacheProvider, css, Global, Theme } from '@emotion/react'
import { createTheme, CssBaseline, Theme as MuiTheme, ThemeProvider } from '@mui/material'
import { type i18n } from 'i18next'
import { StrictMode, useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import Index from './Page'

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

const globalStyle = (theme: Theme) => css`
  body {
    ${theme.breakpoints.up('sm')} {
      overflow: hidden;
    }
  }
`

export const cache = createCache({ key: 'c', prepend: true })

interface Props {
  i18n: i18n
}

const App = ({ i18n }: Props) => {
  useEffect(() => {
    const listener = (e: PopStateEvent) => {
      const lang = e.state && e.state.lang || 'ja'

      document.documentElement.lang = lang
      i18n.changeLanguage(lang)
    }

    window.addEventListener('popstate', listener)

    return () => window.removeEventListener('popstate', listener)
  }, [i18n])

  return (
    <StrictMode>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <CssBaseline />
            <Global styles={globalStyle} />
            <Index />
          </I18nextProvider>
        </ThemeProvider>
      </CacheProvider>
    </StrictMode>
  )
}

export default App
