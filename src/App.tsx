import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { createTheme, Theme as MuiTheme, ThemeProvider } from '@mui/material'
import { StrictMode } from 'react'
import Index from './pages/index'

declare module '@emotion/react' {
  interface Theme extends MuiTheme {
  }
}

const theme = createTheme({})

export const cache = createCache({ key: 'c', prepend: true })

const App = () => {
  return (
    <StrictMode>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <Index />
        </ThemeProvider>
      </CacheProvider>
    </StrictMode>
  )
}

export default App
