// @ts-expect-error
import Resize from '@jimp/plugin-resize/src/modules/resize'

export interface ImagePixelData {
  width: number
  height: number
  data: Uint8ClampedArray
}

export default (imageData: ImagePixelData, width: number, height: number) => {
  let data!: Uint8ClampedArray

  const resize = new Resize(
    imageData.width,
    imageData.height,
    width,
    height,
    true,
    true,
    (buffer: Uint8Array) => { data = new Uint8ClampedArray(buffer) }
  )

  resize.resize(imageData.data)

  return { width, height, data }
}
