import React, { Suspense, useMemo, useReducer, useState } from 'react'
import Cards from './Cards'
import Header from './Header'
import Settings, { Asset, assets, CardSize, cardSizes } from './Settings'
import Usage from './Usage'

require('./App.css')

const Preview = React.lazy(() => import('./Preview'))

type Action =
  | { type: 'add', srcList: string[] }
  | { type: 'updateCount', index: number, count: number | null }
  | { type: 'remove', index: number }

export interface CardType {
  id: string
  src: string
  count: number | null
}

const createCard = (src: string): CardType =>
  ({ id: Math.random().toString(32).slice(2), src, count: null })

const revokeCardSrc = (card: CardType | undefined) => {
  if (card) {
    URL.revokeObjectURL(card.src)
  }
}

const fileReducer = (state: CardType[], action: Action) => {
  switch (action.type) {
    case 'add': {
      return [...state, ...action.srcList.map(createCard)]
    }
    case 'updateCount': {
      return state.map((v, i) =>
        i === action.index ? { ...v, count: action.count } : v
      )
    }
    case 'remove': {
      revokeCardSrc(state[action.index])

      return state.filter((_, i) => i !== action.index)
    }
  }
}

const initState: CardType[] = []

export default () => {
  const [cards, dispatch] = useReducer(fileReducer, initState)
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
            removeCard={(index) => dispatch({ type: 'remove', index })}
          />
        </div>
        {!cards.length ? <Usage /> : (
          <Suspense fallback={null}>
            <Preview
              className="App-Preview"
              size={size}
              orientation={orientation}
              list={list}
              cardSize={cardSizes[cardSize]}
            />
          </Suspense>
        )}
      </div>
    </div>
  )
}
