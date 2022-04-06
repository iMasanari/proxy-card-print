import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'

const container = document.getElementById('app')!

if (import.meta.env.PROD) {
  hydrateRoot(container, <App />)
} else {
  createRoot(container).render(<App />)
}
