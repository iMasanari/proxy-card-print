import { css, Theme } from '@emotion/react'
import { useReducer } from 'react'
import Header from '~/common/layouts/Header'
import Cards from '~/features/cards/Cards'
import cardsReducer, { CardsState } from '~/features/cards/cardsReducer'
import Preview from '~/features/preview/Preview'
import { usePreviewData } from '~/features/preview/previewHooks'
import Settings from '~/features/settings/Settings'
import settingsReducer, { SettingsState } from '~/features/settings/settingsReducer'
import Usage from '~/features/usage/Usage'

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
    overflow: auto;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 300px;
  }
`

const previewStyle = (theme: Theme) => css`
  margin-top: ${theme.spacing(1)};
  @media (min-width: 600px) {
    flex: 1;
  }
`

const intiSettings: SettingsState = {
  pageSize: 'A4',
  cardSize: 'スモールサイズ',
  cardWidth: '59',
  cardHeight: '86',
}

const initCards: CardsState = []

const Index = () => {
  const [settingsForm, settingsDispatch] = useReducer(settingsReducer, intiSettings)
  const [cardsForm, cardsDispatch] = useReducer(cardsReducer, initCards)

  const data = usePreviewData(settingsForm, cardsForm)

  return (
    <div css={appStyle}>
      <Header />
      <div css={contentsStyle}>
        <div css={conditionsStyle}>
          <Settings form={settingsForm} dispatch={settingsDispatch} />
          <Cards
            cards={cardsForm}
            cardWidth={data.cardWidth}
            cardHeight={data.cardHeight}
            dispatch={cardsDispatch}
          />
        </div>
        {!data.cards.length ? <Usage /> : (
          <Preview css={previewStyle} data={data} />
        )}
      </div>
    </div>
  )
}

export default Index
