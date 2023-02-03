import { getPixcel, toGray } from './color'
import resize, { ImagePixelData } from './resize'

export const size = 8

export const getHash = (imageData: ImagePixelData) => {
  const resizedImageData = resize(imageData, size + 1, size)

  const list = Array(size * size)

  // ハッシュ情報の取得
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const left = toGray(getPixcel(resizedImageData, col, row))
      const right = toGray(getPixcel(resizedImageData, col + 1, row))

      list[row * resizedImageData.width + col] = left < right ? 1 : 0
    }
  }

  return list.join('')
}

export const distance = (a: string, b: string) => {
  let count = 0

  for (let i = a.length; i--;) {
    if (a[i] !== b[i]) {
      ++count
    }
  }

  return count
}
