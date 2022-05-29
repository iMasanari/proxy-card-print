import PromiseWorker from 'promise-worker'
import { Option } from './worker'
import PdfWorker from './worker?worker'

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
  const name = `プロキシカード印刷-${getTimeStamp(new Date())}.pdf`

  URL.revokeObjectURL(blobURL)

  return new File([await res.blob()], name, { type: 'application/pdf' })
}
