import { OnPrerenderStartAsync } from 'vike/types'

const locales = ['ja', 'en', 'zh-Hans']
const localeDefault = 'ja'

export const onPrerenderStart: OnPrerenderStartAsync = async (prerenderContext): ReturnType<OnPrerenderStartAsync> => {
  const pageContexts = prerenderContext.pageContexts.flatMap((pageContext) => {
    if (pageContext.urlOriginal.startsWith('/articles')) {
      return [{ ...pageContext, locale: localeDefault }]
    }

    return locales.map((locale) => {
      let { urlOriginal } = pageContext
      // Localize URL
      if (urlOriginal == '/' && locale !== localeDefault) {
        urlOriginal = `/${locale.toLowerCase()}/`
      }

      return { ...pageContext, urlOriginal, locale }
    })
  })

  return {
    prerenderContext: {
      pageContexts,
    },
  }
}
