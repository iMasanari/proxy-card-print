import { createTheme, Theme as MuiTheme, ThemeProvider } from '@mui/material'
import { StrictMode } from 'react'
import 'react-image-crop/dist/ReactCrop.css'
import Index from './pages/index'

declare module '@emotion/react' {
  interface Theme extends MuiTheme {
  }
}

const theme = createTheme({})

const App = () => {
  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <Index />
      </ThemeProvider>
    </StrictMode>
  )
}

export default App
