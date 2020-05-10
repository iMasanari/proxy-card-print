import ActionReducer from 'action-reducer'

export interface CardType {
  id: string
  src: string
  orgSrc: string
  count: number | null
}

const { createAction, reducer } = ActionReducer<CardType[]>()

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

export const add = createAction('add', (state, list: string[]) =>
  [...state, ...list.map(createCard)]
)

export const updateCount = createAction('updateCount', (state, index: number, count: number | null) =>
  state.map((v, i) => i === index ? { ...v, count } : v)
)

export const updateSrc = createAction('updateSrc', (state, index: number, src: string) => {
  revokeCardSrc(state[index])

  return state.map((card, i) => i === index ? { ...card, src } : card)
})

export const remove = createAction('remove', (state, index: number) => {
  revokeCardSrc(state[index])
  revokeCardOrgSrc(state[index])

  return state.filter((_, i) => i !== index)
})

export default reducer
