import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

export const initI18n = (lang: string, translation: any) => {
  i18next.use(initReactI18next).init({
    debug: !import.meta.env.SSR && import.meta.env.DEV && lang !== 'ja',
    resources: { [lang]: { translation } },
    lng: lang,
    returnEmptyString: false,
    nsSeparator: false,
    interpolation: { escapeValue: false },
  })

  return i18next
}
