export const cardSizes = {
  'スモールサイズ': ['59', '86'],
  'スタンダードサイズ': ['63', '88'],
} as const

export type CardSize = keyof typeof cardSizes | 'custom'

export const pageSizes = {
  A4: [297, 210],
  'A4(縦)': [210, 297],
  A3: [420, 297],
} as const

export type PageSize = keyof typeof pageSizes

export interface CardType {
  id: number
  file: Blob
  orgFile: Blob
  count: number
}

export interface PreviewData {
  pageWidth: number
  pageHeight: number
  cardWidth: number
  cardHeight: number
  cards: CardType[]
}
