import { Crop } from 'react-image-crop'

const getBlob = (canvas: HTMLCanvasElement) =>
  new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/jpeg', 1))

export const getCroppedImage = async (image: HTMLImageElement, crop: Required<Crop>) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  const width = crop.width * scaleX
  const height = crop.height * scaleY

  canvas.width = width
  canvas.height = height

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    width,
    height,
    0,
    0,
    width,
    height,
  )

  const blob = await getBlob(canvas)

  return URL.createObjectURL(blob)
}
