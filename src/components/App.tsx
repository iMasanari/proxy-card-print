import React, { Suspense, useReducer } from 'react'
import Cards from './Cards'

const Preview = React.lazy(() => import('./Preview'))

type Action =
  | { type: 'add' }
  | { type: 'updateSrc', index: number, file: File | undefined }
  | { type: 'updateCount', index: number, count: number | null }
  | { type: 'remove', index: number }

export interface CardType {
  id: string
  src: string | null
  count: number | null
}

const createCard = (): CardType =>
  ({ id: Math.random().toString(32).slice(2), src: null, count: 1 })

const revokeCardSrc = (card: CardType) => {
  if (card && card.src) {
    URL.revokeObjectURL(card.src)
  }
}

const fileReducer = (state: CardType[], action: Action) => {
  switch (action.type) {
    case 'add': {
      return [...state, createCard()]
    }
    case 'updateSrc': {
      revokeCardSrc(state[action.index])

      const src = action.file ? URL.createObjectURL(action.file) : null

      return state.map((v, i) =>
        i === action.index ? { ...v, src } : v
      )
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

const initState: CardType[] = [createCard()]

export default () => {
  const [cards, dispatch] = useReducer(fileReducer, initState)

  const list = cards.reduce((acc, v) => (
    v.src ? [...acc, ...Array(v.count || 0).fill(v.src)] : acc
  ), [] as string[])

  return (
    <div className="App">
      <Cards
        cards={cards}
        updateCardFile={(index, file) => dispatch({ type: 'updateSrc', index, file })}
        updateCardCount={(index, count) => dispatch({ type: 'updateCount', index, count })}
        removeCard={(index) => dispatch({ type: 'remove', index })}
      />
      <button onClick={() => dispatch({ type: 'add' })}>追加</button>
      <div>
        <Suspense fallback={<button>準備中</button>}>
          <Preview list={list} />
        </Suspense>
      </div>
    </div>
  )
}
