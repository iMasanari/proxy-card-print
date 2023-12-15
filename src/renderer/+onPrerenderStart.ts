import { OnPrerenderStartAsync } from 'vike/types'

const locales = ['ja', 'en', 'zh-Hans']
const localeDefault = 'ja'

export const onPrerenderStart: OnPrerenderStartAsync = async (prerenderContext): ReturnType<OnPrerenderStartAsync> => {
  const pageContexts = prerenderContext.pageContexts.flatMap((pageContext) => {
    return locales.map((locale) => {
      // Localize URL
      let { urlOriginal } = pageContext
      if (locale !== localeDefault) {
        urlOriginal = `/${locale.toLowerCase()}${urlOriginal}`
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
