import { atom, selector } from 'recoil'

export const assets = {
  A4: { size: 'A4', orientation: 'portrait' },
  'A4(横)': { size: 'A4', orientation: 'landscape' },
  A3: { size: 'A3', orientation: 'landscape' },
} as const

export type Asset = keyof typeof assets

export const assetState = atom<Asset>({
  key: 'asset',
  default: 'A4',
})

export const assetValueSelector = selector({
  key: 'assetValue',
  get: ({ get }) => assets[get(assetState)],
})

export const cardWidthState = atom<number | null>({
  key: 'cardWidth',
  default: 59,
})

export const cardHeightState = atom<number | null>({
  key: 'cardHeight',
  default: 86,
})

export const defaultCountState = atom<number | null>({
  key: 'defaultCount',
  default: 1,
})
