import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import { initI18n } from './i18n'

const container = document.getElementById('app')!

const i18n = initI18n(document.documentElement.lang)

if (import.meta.env.PROD) {
  hydrateRoot(container, <App i18n={i18n} />)
} else {
  createRoot(container).render(<App i18n={i18n} />)
}
