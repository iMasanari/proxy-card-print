import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const Meta = () => {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const listener = (lang: string) => {
      document.documentElement.lang = lang

      document.title = t('Meta.title', 'プロキシカード印刷｜PCスマホで簡単作成、コンビニ印刷！')
      document.querySelector<HTMLLinkElement>('link[rel="manifest"]')!.href = t('Meta.manifestURL', '/manifest/ja.webmanifest')
    }

    i18n.on('languageChanged', listener)

    return () => i18n.off('languageChanged', listener)
  }, [i18n, t])

  return null
}

export default Meta
