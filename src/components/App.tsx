import React, { Suspense, useReducer, useState } from 'react'
import AddCard from './AddCard'
import Cards from './Cards'

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

const assets = {
  A4: { size: 'A4', orientation: 'portrait' },
  A3: { size: 'A3', orientation: 'landscape' },
} as const

type Asset = keyof typeof assets

export default () => {
  const [cards, dispatch] = useReducer(fileReducer, initState)
  const [asset, updateAsset] = useState('A4' as Asset)

  const list = cards.reduce((acc, v) => (
    v.src ? [...acc, ...Array(v.count || 0).fill(v.src)] : acc
  ), [] as string[])

  const { size, orientation } = assets[asset]

  return (
    <div className="App">
      <Cards
        cards={cards}
        updateCardCount={(index, count) => dispatch({ type: 'updateCount', index, count })}
        removeCard={(index) => dispatch({ type: 'remove', index })}
      />
      <AddCard add={(srcList) => dispatch({ type: 'add', srcList })} />
      <div>
        {'サイズ: '}
        <select value={asset} onChange={e => updateAsset(e.currentTarget.value as Asset)}>
          {Object.keys(assets).map(v =>
            <option key={v} value={v}>{v}</option>
          )}
        </select>
      </div>
      <div>
        <Suspense fallback={<button>準備中</button>}>
          <Preview size={size} orientation={orientation} list={list} />
        </Suspense>
      </div>
    </div>
  )
}
