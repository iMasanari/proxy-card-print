import React, { Suspense, useReducer, useState } from 'react'
import Cards from './Cards'
import Header from './Header'
import Settings, { Asset, assets } from './Settings'
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
  ({ id: Math.random().toString(32).slice(2), src, count: 1 })

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
  const [asset, setAsset] = useState('A4' as Asset)

  const list = cards.reduce((acc, v) => (
    v.src ? [...acc, ...Array(v.count || 0).fill(v.src)] : acc
  ), [] as string[])

  const { size, orientation } = assets[asset]

  return (
    <div className="App">
      <Header />
      <div className="App-contents">
        <div className="App-conditions">
          <Settings
            asset={asset}
            setAsset={setAsset}
          />
          <Cards
            cards={cards}
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
            />
          </Suspense>
        )}
      </div>
    </div>
  )
}
