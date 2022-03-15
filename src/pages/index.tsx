import { css, Global, Theme } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import React, { useReducer } from 'react'
import Header from '~/common/layouts/Header'
import Cards from '~/features/cards/Cards'
import cardsReducer, { CardsState } from '~/features/cards/cardsReducer'
import Preview from '~/features/preview/Preview'
import { usePreviewData } from '~/features/preview/previewHooks'
import Settings from '~/features/settings/Settings'
import settingsReducer from '~/features/settings/settingsReducer'
import Usage from '~/features/usage/Usage'

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
  #app {
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

  const data = usePreviewData(settingsForm, cardsForm)

  return (
    <div css={appStyle}>
      <CssBaseline />
      <Global styles={globalStyle} />
      <Header />
      <div css={contentsStyle}>
        <div css={conditionsStyle}>
          <Settings form={settingsForm} dispatch={settingsDispatch} />
          <Cards cards={cardsForm} cardInitCount={data.cardInitCount} dispatch={cardsDispatch} />
        </div>
        {!data.cards.length ? <Usage /> : (
          <Preview css={previewStyle} data={data} />
        )}
      </div>
    </div>
  )
}

export default Index
