import React, { useMemo, useReducer } from 'react'
import cardsReducer, { CardType } from '~/modules/cards'
import settingsReducer, { Asset, assets } from '~/modules/settings'
import Cards from './cards/Cards'
import Header from './layouts/Header'
import Preview from './preview/Preview'
import Usage from './preview/Usage'
import Settings from './settings/Settings'

require('./App.css')

const cardsInitState = [] as CardType[]

const settingsInitState = {
  asset: 'A4' as Asset,
  cardWidth: 59,
  cardHeight: 86,
  defaultCount: 1 as number | null,
}

export default () => {
  const [cards, cardsDispatch] = useReducer(cardsReducer, cardsInitState)
  const [settings, settingsDispatch] = useReducer(settingsReducer, settingsInitState)
  const { asset, cardWidth, cardHeight, defaultCount } = settings

  const list = useMemo(() => (
    cards.reduce((acc, v) => {
      const count = v.count ?? defaultCount ?? 0

      return count > 0 ? [...acc, ...Array(count).fill(v.src)] : acc
    }, [] as string[])
  ), [cards, defaultCount])

  const { size, orientation } = assets[asset]

  const cardSize: [number, number] = [
    Math.min(Math.max(1, cardWidth), 150),
    Math.min(Math.max(1, cardHeight), 150),
  ]

  return (
    <div className="App">
      <Header />
      <div className="App-contents">
        <div className="App-conditions">
          <Settings
            settings={settings}
            dispatch={settingsDispatch}
          />
          <Cards
            cards={cards}
            dispatch={cardsDispatch}
            defaultCount={defaultCount}
          />
        </div>
        {!cards.length ? <Usage /> : (
          <Preview
            className="App-Preview"
            size={size}
            orientation={orientation}
            list={list}
            cardSize={cardSize}
          />
        )}
      </div>
    </div>
  )
}
