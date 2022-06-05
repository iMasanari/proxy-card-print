import createCache from '@emotion/cache'
import { CacheProvider, css, Global } from '@emotion/react'
import { createTheme, CssBaseline, Theme as MuiTheme, ThemeProvider } from '@mui/material'
import { StrictMode } from 'react'
import Index from './pages/index'

declare module '@emotion/react' {
  interface Theme extends MuiTheme {
  }
}

const theme = createTheme({})

const globalStyle = css`
  body {
    margin: 0;
    font-family: sans-serif;
    @media (min-width: 600px) {
      overflow: hidden;
    }
  }
  html,
  body,
  #app {
    @media (min-width: 600px) {
      height: 100%;
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
