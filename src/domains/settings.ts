export const cardSizes = {
  'スモールサイズ': ['59', '86'],
  'スタンダードサイズ': ['63', '88'],
} as const

export type CardSize = keyof typeof cardSizes | 'custom'

export const pageSizes = {
  A4: [297, 210],
  B4: [364, 257],
  A3: [420, 297],
  'レターサイズ': [279.4, 215.9],
} as const

export type PageSize = keyof typeof pageSizes

export interface CardType {
  id: number
  file: Blob
  orgFile: Blob
  count: number
}

export interface PreviewData {
  pageSize: PageSize
  pageWidth: number
  pageHeight: number
  cardWidth: number
  cardHeight: number
  cards: CardType[]
}
