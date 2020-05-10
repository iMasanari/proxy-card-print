import React, { useMemo, useReducer, useState } from 'react'
import cardsReducer, { CardType } from '../modules/cards'
import Cards from './cards/Cards'
import Header from './layouts/Header'
import Preview from './preview/Preview'
import Usage from './preview/Usage'
import Settings, { Asset, assets, CardSize, cardSizes } from './settings/Settings'

require('./App.css')

const cardsInitState = [] as CardType[]

export default () => {
  const [cards, dispatch] = useReducer(cardsReducer, cardsInitState)
  const [cardSize, setCardSize] = useState<CardSize>('59mm x 86mm')
  const [asset, setAsset] = useState<Asset>('A4')
  const [defaultCount, setDefaultCount] = useState<number | null>(1)

  const list = useMemo(() => (
    cards.reduce((acc, v) => {
      const count = v.count ?? defaultCount ?? 0

      return count > 0 ? [...acc, ...Array(count).fill(v.src)] : acc
    }, [] as string[])
  ), [cards, defaultCount])

  const { size, orientation } = assets[asset]

  return (
    <div className="App">
      <Header />
      <div className="App-contents">
        <div className="App-conditions">
          <Settings
            asset={asset}
            setAsset={setAsset}
            cardSize={cardSize}
            setCardSize={setCardSize}
            defaultCount={defaultCount}
            setDefaultCount={setDefaultCount}
          />
          <Cards
            cards={cards}
            defaultCount={defaultCount}
            addCards={(srcList) => dispatch({ type: 'add', srcList })}
            updateCardCount={(index, count) => dispatch({ type: 'updateCount', index, count })}
            updateCardSrc={(index, src) => dispatch({ type: 'updateSrc', index, src })}
            removeCard={(index) => dispatch({ type: 'remove', index })}
          />
        </div>
        {!cards.length ? <Usage /> : (
          <Preview
            className="App-Preview"
            size={size}
            orientation={orientation}
            list={list}
            cardSize={cardSizes[cardSize]}
          />
        )}
      </div>
    </div>
  )
}
