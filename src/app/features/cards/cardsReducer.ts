import ActionReducer from 'action-reducer'
import { CardImageData } from '~/domains/settings'

export interface SettingsCard {
  id: number
  data: CardImageData
  orgData: CardImageData
  count: string
}

export type CardsState = SettingsCard[]

const { createAction, reducer: cardsReducer } = ActionReducer<CardsState>()

let _idIndex = 0

const createId = () => ++_idIndex

const createCard = (data: CardImageData): SettingsCard => {
  return { id: createId(), data, orgData: data, count: '1' }
}

export const addCardsAction = createAction((state, list: CardImageData[]) =>
  [...state, ...list.map(createCard)],
)

export const updateCardCountAction = createAction((state, index: number, count: string) =>
  state.map((v, i) => i === index ? { ...v, count } : v),
)

export const updateCardDataAction = createAction((state, index: number, data: CardImageData) =>
  state.map((card, i) => i === index ? { ...card, data } : card)
)

export const removeCardAction = createAction((state, index: number) =>
  state.filter((_, i) => i !== index)
)

export default cardsReducer
