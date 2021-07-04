import { Global, Theme } from '@emotion/react'
import { css } from '@emotion/react'
import { CssBaseline } from '@material-ui/core'
import Head from 'next/head'
import React from 'react'
import { useRecoilValue } from 'recoil'
import Cards from '../components/cards/Cards'
import Header from '../components/layouts/Header'
import Preview from '../components/preview/Preview'
import Usage from '../components/preview/Usage'
import Settings from '../components/settings/Settings'
import { cardsState } from '~/modules/cards'

const globalStyle = css`
  body {
    margin: 0;
    font-family: sans-serif;
    @media (min-width: 600px) {
        overflow: hidden;
    }
  }
  html,
  body,
  #__next {
    @media (min-width: 600px) {
      height: 100%;
    }
  }
  .svg-icon {
    vertical-align: text-top;
  }
`

const appStyle = css`
  @media (min-width: 600px) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`

const contentsStyle = css`
  @media (min-width: 600px) {
    display: flex;
    flex: 1;
    overflow: hidden;
  }
`

const conditionsStyle = css`
  @media (min-width: 600px) {
    width: 300px;
    display: flex;
    flex-direction: column;
  }
`

const previewStyle = (theme: Theme) => css`
  margin-top: ${theme.spacing(1)};
  @media (min-width: 600px) {
    flex: 1;
  }
`

export default () => {
  const cards = useRecoilValue(cardsState)

  return (
    <div css={appStyle}>
      <Head>
        <title>プロキシカード印刷</title>
      </Head>
      <CssBaseline />
      <Global styles={globalStyle} />
      <Header />
      <div css={contentsStyle}>
        <div css={conditionsStyle}>
          <Settings />
          <Cards />
        </div>
        {!cards.length ? <Usage /> : (
          <Preview css={previewStyle} />
        )}
      </div>
    </div>
  )
}
