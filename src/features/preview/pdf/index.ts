import PromiseWorker from 'promise-worker'
import { Option } from './worker'
import PdfWorker from './worker?worker'

const ps = typeof window === 'object'
  ? new PromiseWorker(new PdfWorker())
  : null!

export const createPdfFile = async (option: Option) => {
  const blobURL = await ps.postMessage<string, Option>(option)
  const res = await fetch(blobURL)

  URL.revokeObjectURL(blobURL)

  return res.blob()
}
