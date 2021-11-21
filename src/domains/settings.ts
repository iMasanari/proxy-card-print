export const cardSizes = {
  '59mm x 86mm': ['59', '86'],
  '63mm x 88mm': ['63', '88'],
} as const

export type CardSize = keyof typeof cardSizes | 'custom'

export const pageSizes = {
  A4: [297, 210],
  'A4(縦)': [210, 297],
  A3: [420, 297],
} as const

export type PageSize = keyof typeof pageSizes

export interface CardType {
  id: string
  src: string
  orgSrc: string
  count: number
}

export interface SettingsType {
  pageWidth: number
  pageHeight: number
  cardWidth: number
  cardHeight: number
  cards: CardType[]
}
