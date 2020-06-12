import ActionReducer from 'action-reducer'

export const assets = {
  A4: { size: 'A4', orientation: 'portrait' },
  'A4(横)': { size: 'A4', orientation: 'landscape' },
  A3: { size: 'A3', orientation: 'landscape' },
} as const

export type Asset = keyof typeof assets

export interface SettingsType {
  asset: Asset
  cardWidth: number
  cardHeight: number
  defaultCount: number | null
}

const { createAction, reducer } = ActionReducer<SettingsType>()

export const setAsset = createAction('setAsset', (state, asset: Asset) =>
  ({ ...state, asset })
)

export const updateCardWidth = createAction('updateCardWidth', (state, cardWidth: number) =>
  ({ ...state, cardWidth })
)

export const updateCardHeight = createAction('updateCardHeight', (state, cardHeight: number) =>
  ({ ...state, cardHeight })
)

export const setDefaultCount = createAction('setDefaultCount', (state, defaultCount: number | null) =>
  ({ ...state, defaultCount })
)

export default reducer
