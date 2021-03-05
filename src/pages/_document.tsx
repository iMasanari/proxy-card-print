import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import favicon from '../assets/favicon.png'
import icon from '../assets/icon.png'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <meta charSet="utf-8" />
          {/* <title>プロキシカード印刷</title> */}
          <meta name="description" content="カードゲームのプロキシ(コピーカード)を簡単に印刷するWebアプリ" />
          <meta property="og:title" content="プロキシカード印刷" />
          <meta property="og:type" content="website" />
          <meta property="og:description" content="カードゲームのプロキシ(コピーカード)を簡単に印刷するWebアプリ" />
          <meta property="og:url" content="https://imasanari.github.io/proxy-card-print/" />
          <meta property="og:image" content={`https://imasanari.github.io/proxy-card-print${icon}`} />
          <meta name="twitter:card" content="summary" />
          <link rel="icon" href={favicon} />
          <link rel="apple-touch-icon" href={icon} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
