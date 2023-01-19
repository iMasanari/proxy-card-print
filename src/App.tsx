import createCache from '@emotion/cache'
import { CacheProvider, css, Global, Theme } from '@emotion/react'
import { createTheme, CssBaseline, Theme as MuiTheme, ThemeProvider } from '@mui/material'
import i18next from 'i18next'
import { StrictMode } from 'react'
import { initReactI18next } from 'react-i18next'
import enTranslation from './locales/en/translation.json'
import jaTranslation from './locales/ja/translation.json'
import Index from './pages/index'

const lang: string = 'ja'

i18next.use(initReactI18next).init({
  debug: import.meta.env.DEV,
  resources: {
    ja: { translation: jaTranslation },
    en: { translation: enTranslation },
  },
  lng: lang,
  returnEmptyString: false,
  nsSeparator: false,
  interpolation: { escapeValue: false },
})

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

const App = () => {
  return (
    <StrictMode>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Global styles={globalStyle} />
          <Index />
        </ThemeProvider>
      </CacheProvider>
    </StrictMode>
  )
}

export default App
