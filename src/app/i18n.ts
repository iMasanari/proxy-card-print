import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslation from '~/locales/en/translation.json'
import jaTranslation from '~/locales/ja/translation.json'
import zhHansTranslation from '~/locales/zh-hans/translation.json'

const resources = {
  // ja: { translation: jaTranslation },
  en: { translation: enTranslation },
  'zh-Hans': { translation: zhHansTranslation },
}

export const initI18n = (lang: string) => {
  i18next.use(initReactI18next).init({
    debug: import.meta.env.DEV,
    resources: import.meta.env.DEV
      ? { ...resources, ja: { translation: jaTranslation } }
      : resources,
    lng: lang,
    returnEmptyString: false,
    nsSeparator: false,
    interpolation: { escapeValue: false },
  })

  return i18next
}
