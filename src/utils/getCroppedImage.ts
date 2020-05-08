import { Crop } from 'react-image-crop'

const getBlob = (canvas: HTMLCanvasElement) =>
  new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/jpeg', 1))

export default async (image: HTMLImageElement, crop: Required<Crop>) => {
  const canvas = document.createElement('canvas')
  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height

  canvas.width = crop.width * scaleX
  canvas.height = crop.height * scaleY

  const ctx = canvas.getContext('2d')!

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    canvas.width,
    canvas.height,
  )

  const blob = await getBlob(canvas)

  return URL.createObjectURL(blob)
}
