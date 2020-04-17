import blobStream from 'blob-stream'

export const toPoint = (mm: number) =>
  mm * (72 / 2.54 / 10)

export const readFile = (src: string) => new Promise<ArrayBuffer>(resolve => {
  const xhr = new XMLHttpRequest()
  xhr.responseType = 'arraybuffer'
  xhr.onload = () => resolve(xhr.response)
  xhr.open('GET', src)
  xhr.send()
})

export const toBlobURL = (doc: PDFKit.PDFDocument) => {
  const stream = doc.pipe(blobStream())

  return new Promise<string>(resolve => {
    stream.on('finish', () => {
      resolve(stream.toBlobURL('application/pdf'))
    })
  })
}

export const chunk = <T>(array: T[], size: number) => {
  const chunked = []
  let index = 0

  while (index < array.length) {
    chunked.push(array.slice(index, index + size))
    index += size
  }

  return chunked
}
