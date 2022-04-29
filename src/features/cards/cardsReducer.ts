import ActionReducer from 'action-reducer'

export interface SettingsCard {
  id: number
  file: Blob
  orgFile: Blob
  count: string
}

export type CardsState = SettingsCard[]

const { createAction, reducer: cardsReducer } = ActionReducer<CardsState>()


let _idIndex = 0

const createId = () => ++_idIndex

const createCard = (file: Blob): SettingsCard => {
  return { id: createId(), file, orgFile: file, count: '' }
}

export const addCardsAction = createAction((state, list: Blob[]) =>
  [...state, ...list.map(createCard)],
)

export const updateCardCountAction = createAction((state, index: number, count: string) =>
  state.map((v, i) => i === index ? { ...v, count } : v),
)

export const updateCardFileAction = createAction((state, index: number, file: Blob) =>
  state.map((card, i) => i === index ? { ...card, file } : card)
)

export const removeCardAction = createAction((state, index: number) =>
  state.filter((_, i) => i !== index)
)

export default cardsReducer
