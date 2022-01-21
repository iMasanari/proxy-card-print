import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

const googleAnalyticsScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', ${JSON.stringify(googleAnalyticsId)});
`

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head>
          {googleAnalyticsId && (
            <>
              <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}></script>
              <script dangerouslySetInnerHTML={{ __html: googleAnalyticsScript }}></script>
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
