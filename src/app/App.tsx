import { css, Theme } from '@emotion/react'
import { useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import Cards from './features/cards/Cards'
import cardsReducer, { CardsState } from './features/cards/cardsReducer'
import Maybe from './features/maybe/Maybe'
import Preview from './features/preview/Preview'
import { usePreviewData } from './features/preview/previewHooks'
import Settings from './features/settings/Settings'
import settingsReducer, { SettingsState } from './features/settings/settingsReducer'
import Usage from './features/usage/Usage'

const appStyle = (theme: Theme) => css`
  ${theme.breakpoints.up('sm')} {
    display: flex;
    flex: 1;
    overflow: hidden;
  }
  ${theme.breakpoints.up('sm')} {
    #app:has(&) {
      height: 100vh;
      height: 100dvh;
      display: flex;
      flex-direction: column;
    }
  }
`

const conditionsStyle = (theme: Theme) => css`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${theme.spacing(1)};
  align-content: start;
  padding-top: ${theme.spacing(1)};
  ${theme.breakpoints.up('sm')} {
    overflow: auto;
    position: relative;
    width: 300px;
  }
`

const resultStyle = (theme: Theme) => css`
  ${theme.breakpoints.up('sm')} {
    flex: 1;
    overflow-y: auto;
  }
  ${theme.breakpoints.up('md')} {
    display: flex;
  }
`

const maybeStyle = (theme: Theme) => css`
  padding-top: ${theme.spacing(1)};
  ${theme.breakpoints.up('md')} {
    width: 300px;
    overflow-y: auto;
  }
`

const previewStyle = (theme: Theme) => css`
  margin-top: ${theme.spacing(1)};
  ${theme.breakpoints.up('sm')} {
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

const App = () => {
  const [settingsForm, settingsDispatch] = useReducer(settingsReducer, intiSettings)
  const [cardsForm, cardsDispatch] = useReducer(cardsReducer, initCards)
  const { i18n } = useTranslation()

  const data = usePreviewData(settingsForm, cardsForm)

  return (
    <div css={appStyle}>
      <style
        dangerouslySetInnerHTML={{
          __html: '@media(min-width:600px)body{overflow:hidden;}',
        }}
      />
      <div css={conditionsStyle}>
        <Settings form={settingsForm} dispatch={settingsDispatch} />
        <Cards
          cards={cardsForm}
          cardWidth={data.cardWidth}
          cardHeight={data.cardHeight}
          dispatch={cardsDispatch}
        />
      </div>
      <div css={resultStyle}>
        {!data.cards.length ? <Usage /> : (
          <Preview css={previewStyle} data={data} />
        )}
        {i18n.language === 'ja' && data.cards.length > 0 && (
          <div css={maybeStyle}>
            <Maybe cards={cardsForm} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
