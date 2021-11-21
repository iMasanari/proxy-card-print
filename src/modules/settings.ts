import ActionReducer from 'action-reducer'
import { CardSize, cardSizes } from '~/domains/settings'

export interface SettingsState {
  pageSize: string
  cardSize: string
  cardWidth: string
  cardHeight: string
  cardInitCount: string
}

const { createAction, reducer: settingsReducer } = ActionReducer<SettingsState>()

export const updateSettingsAction = createAction(<T extends keyof SettingsState>(state: SettingsState, name: T, value: SettingsState[T]) => {
  if (name === 'cardSize' && value !== 'custom') {
    const [cardWidth, cardHeight] = cardSizes[value as Exclude<CardSize, 'custom'>]

    return { ...state, [name]: value, cardWidth, cardHeight }
  }

  return { ...state, [name]: value }
})

export default settingsReducer
