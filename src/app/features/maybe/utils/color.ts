import { ImagePixelData } from './resize'

export const getPixcel = (imageData: ImagePixelData, col: number, row: number): [number, number, number] => {
  const base = (row * imageData.width + col) * 4
  const r = imageData.data[base]
  const g = imageData.data[base + 1]
  const b = imageData.data[base + 2]

  return [r, g, b]
}

export const toGray = ([r, g, b]: [number, number, number]) =>
  0.299 * r + 0.587 * g + 0.114 * b
