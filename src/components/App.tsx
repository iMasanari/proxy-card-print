import React, { useMemo, useReducer, useState } from 'react'
import { CardType } from './cards/Card'
import Cards from './cards/Cards'
import Header from './layouts/Header'
import Preview from './preview/Preview'
import Usage from './preview/Usage'
import Settings, { Asset, assets, CardSize, cardSizes } from './settings/Settings'

require('./App.css')

type Action =
  | { type: 'add', srcList: string[] }
  | { type: 'updateCount', index: number, count: number | null }
  | { type: 'updateSrc', index: number, src: string }
  | { type: 'remove', index: number }

const createCard = (src: string): CardType =>
  ({ id: Math.random().toString(32).slice(2), src, orgSrc: src, count: null })

const revokeCardSrc = (card: CardType | undefined) => {
  if (card && card.src !== card.orgSrc) {
    URL.revokeObjectURL(card.src)
  }
}

const revokeCardOrgSrc = (card: CardType | undefined) => {
  if (card) {
    URL.revokeObjectURL(card.src)
  }
}

const cardsReducer = (state: CardType[], action: Action) => {
  switch (action.type) {
    case 'add': {
      return [...state, ...action.srcList.map(createCard)]
    }
    case 'updateCount': {
      return state.map((v, i) =>
        i === action.index ? { ...v, count: action.count } : v
      )
    }
    case 'updateSrc': {
      revokeCardSrc(state[action.index])

      return state.map((card, i) =>
        i === action.index ? { ...card, src: action.src } : card
      )
    }
    case 'remove': {
      revokeCardSrc(state[action.index])
      revokeCardOrgSrc(state[action.index])

      return state.filter((_, i) => i !== action.index)
    }
  }
}

const initState: CardType[] = []

export default () => {
  const [cards, dispatch] = useReducer(cardsReducer, initState)
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
