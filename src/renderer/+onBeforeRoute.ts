import { OnBeforeRouteSync } from 'vike/types'

const defaultLocale = { locale: 'ja', prefix: '/' }

const otherLocales = [
  { locale: 'en', prefix: '/en/' },
  { locale: 'zh-Hans', prefix: '/zh-hans/' },
]

export const onBeforeRoute: OnBeforeRouteSync = (pageContext): ReturnType<OnBeforeRouteSync> => {
  const { locale, urlLogical } = extractLocale(pageContext.urlOriginal)

  return {
    pageContext: { locale, urlLogical },
  }
}

const extractLocale = (url: string) => {
  const { locale, prefix } = otherLocales.find(v => url.startsWith(v.prefix)) ?? defaultLocale
  const urlLogical = url.slice(prefix.length - 1)

  return { locale, urlLogical }
}
