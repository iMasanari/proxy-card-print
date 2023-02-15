import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './app/App'
import { initI18n } from './app/i18n'

export const createApp = (lang: string, translation?: any) => {
  const container = document.getElementById('app')!
  const i18n = initI18n(lang, translation)

  if (import.meta.env.PROD) {
    hydrateRoot(container, <App i18n={i18n} />)
  } else {
    createRoot(container).render(<App i18n={i18n} />)
  }
}
