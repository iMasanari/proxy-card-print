import { css, Global, Theme } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import Head from 'next/head'
import React, { useMemo, useReducer } from 'react'
import Cards from '../components/cards/Cards'
import Header from '../components/layouts/Header'
import Preview from '../components/preview/Preview'
import Usage from '../components/preview/Usage'
import Settings from '../components/settings/Settings'
import { PageSize, pageSizes } from '~/domains/settings'
import cardsReducer, { CardsState } from '~/modules/cards'
import settingsReducer from '~/modules/settings'

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

const toInt = (str: string, defaultValue = NaN) =>
  /[1-9]*[0-9]/.test(str) ? +str : defaultValue

const intiSettings = {
  pageSize: 'A4',
  cardSize: '59mm x 86mm',
  cardWidth: '59',
  cardHeight: '86',
  cardInitCount: '1',
}

const initCards: CardsState = []

const Index = () => {
  const [settingsForm, settingsDispatch] = useReducer(settingsReducer, intiSettings)
  const [cardsForm, cardsDispatch] = useReducer(cardsReducer, initCards)

  const settings = useMemo(() => {
    const [pageWidth, pageHeight] = pageSizes[settingsForm.pageSize as PageSize] || pageSizes['A4']
    const cardWidth = Math.min(Math.max(1, toInt(settingsForm.cardWidth, 0)), pageWidth)
    const cardHeight = Math.min(Math.max(1, toInt(settingsForm.cardHeight, 0)), pageHeight)
    const cardInitCount = toInt(settingsForm.cardInitCount, 0)

    const cards = cardsForm.map(card => ({
      ...card,
      count: toInt(card.count, cardInitCount),
    }))

    return {
      pageWidth,
      pageHeight,
      cardWidth,
      cardHeight,
      cards,
      cardInitCount,
    }
  }, [settingsForm, cardsForm])

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
          <Settings form={settingsForm} dispatch={settingsDispatch} />
          <Cards cards={cardsForm} cardInitCount={settings.cardInitCount} dispatch={cardsDispatch} />
        </div>
        {!settings.cards.length ? <Usage /> : (
          <Preview css={previewStyle} settings={settings} />
        )}
      </div>
    </div>
  )
}

export default Index
