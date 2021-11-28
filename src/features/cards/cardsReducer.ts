import ActionReducer from 'action-reducer'

export interface SettingsCard {
  id: string
  src: string
  orgSrc: string
  count: string
}

export type CardsState = SettingsCard[]

const { createAction, reducer: cardsReducer } = ActionReducer<CardsState>()

const createCard = (blob: Blob): SettingsCard => {
  const src = URL.createObjectURL(blob)

  return { id: src, src, orgSrc: src, count: '' }
}

const revokeCardSrc = (card: SettingsCard | undefined) => {
  if (card && card.src !== card.orgSrc) {
    URL.revokeObjectURL(card.src)
  }
}

const revokeCardOrgSrc = (card: SettingsCard | undefined) => {
  if (card) {
    URL.revokeObjectURL(card.src)
  }
}

export const addCardsAction = createAction((state, list: Blob[]) =>
  [...state, ...list.map(createCard)],
)

export const updateCardCountAction = createAction((state, index: number, count: string) =>
  state.map((v, i) => i === index ? { ...v, count } : v),
)

export const updateCardSrcAction = createAction((state, index: number, src: string) => {
  revokeCardSrc(state[index])

  return state.map((card, i) => i === index ? { ...card, src } : card)
})

export const removeCardAction = createAction((state, index: number) => {
  const card = state[index]

  revokeCardSrc(card)
  revokeCardOrgSrc(card)

  return state.filter((_, i) => i !== index)
})

export default cardsReducer
