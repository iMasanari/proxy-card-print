import PromiseWorker from 'promise-worker'
import { Option } from './pdf.worker'
import PdfWorker from './pdf.worker?worker'

const ps = typeof window === 'object'
  ? new PromiseWorker(new PdfWorker())
  : null!

const getTimeStamp = (date: Date) => {
  const year = date.getFullYear()
  const month = `0${date.getMonth() + 1}`.slice(-2)
  const day = `0${date.getDate()}`.slice(-2)
  const hours = `0${date.getHours()}`.slice(-2)
  const minutes = `0${date.getMinutes()}`.slice(-2)
  const seconds = `0${date.getSeconds()}`.slice(-2)

  return `${year}${month}${day}-${hours}${minutes}${seconds}`
}

export const createPdfFile = async (option: Option) => {
  const blobURL = await ps.postMessage<string, Option>(option)
  const res = await fetch(blobURL)
  const buffer = await res.arrayBuffer()
  const name = `${option.name}-${getTimeStamp(new Date())}.pdf`

  URL.revokeObjectURL(blobURL)

  return new File([buffer], name, { type: 'application/pdf' })
}
