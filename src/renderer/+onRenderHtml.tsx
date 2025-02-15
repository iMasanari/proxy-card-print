import createEmotionServer from '@emotion/server/create-instance'
import { renderToString } from 'react-dom/server'
import { escapeInject, dangerouslySkipEscape } from 'vike/server'
import type { OnRenderHtmlAsync } from 'vike/types'
import { cache } from '~/common/layouts/Layout'

const SITE_URL = import.meta.env.SITE_URL ?? 'https://proxy-card.imasanari.dev'
const GOOGLE_ANALYTICS_ID = import.meta.env.GOOGLE_ANALYTICS_ID

const manifests = new Map([
  ['ja', '/manifest/ja.webmanifest'],
  ['en', '/manifest/en.webmanifest'],
  ['zh-Hans', '/manifest/zh-hans.webmanifest'],
])

// https://vike.dev/onRenderHtml
export const onRenderHtml: OnRenderHtmlAsync = async (pageContext) => {
  const { Page, pageProps, documentProps, urlPathname } = pageContext

  // This onRenderHtml() hook only supports SSR, see https://vike.dev/render-modes for how to modify
  // onRenderHtml() to support SPA
  if (!Page) {
    throw new Error('My render() hook expects pageContext.Page to be defined')
  }

  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache)

  const pageHtml = renderToString(<Page {...pageProps} />)
  const chunks = extractCriticalToChunks(pageHtml)
  const styles = constructStyleTagsFromChunks(chunks)

  const locale = documentProps?.locale ?? ''
  const title = documentProps?.title ?? ''
  const desc = documentProps?.description ?? ''
  const alternates = documentProps?.alternates ?? []

  const urlPathnameWithTrailingSlash = urlPathname.endsWith('/') ? urlPathname : `${urlPathname}/`
  const pageUrl = `${SITE_URL}${locale === 'ja' ? '' : `/${locale.toLowerCase()}`}${urlPathnameWithTrailingSlash}`

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="${locale}">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
        <meta property="og:title" content="${title}" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="${desc}" />
        <meta property="og:url" content="${pageUrl}" />
        <meta property="og:image" content="${SITE_URL}/images/icons/icon-512x512.png" />
        <meta name="twitter:card" content="summary" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="${SITE_URL}/images/icons/icon-512x512.png" />
        <link rel="canonical" href="${pageUrl}" />
        ${dangerouslySkipEscape(alternates.map(v => `<link rel="alternate" hreflang="${v.lang}" href="${new URL(v.slug, SITE_URL)}" />`).join(''))}
        <link rel="manifest" href="${manifests.get(locale) ?? ''}" />
        ${dangerouslySkipEscape(styles)}
        ${GOOGLE_ANALYTICS_ID ? dangerouslySkipEscape(`<script async src="https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());

            gtag('config', '${GOOGLE_ANALYTICS_ID}');
          </script>`) : ''}
      </head>
      <body>
        <div id="app">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vike.dev/page-redirection
    },
  }
}
