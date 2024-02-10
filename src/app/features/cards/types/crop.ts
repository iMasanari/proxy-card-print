import { CardImageData } from '~/domains/settings'

export interface Crop {
  data: CardImageData
  orgData: CardImageData
  x: number
  y: number
  rotation: number
  zoom: number
}
