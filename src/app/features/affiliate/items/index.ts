import PromiseWorker from 'promise-worker'
import { Option } from './worker'
import PdfWorker from './worker?worker'

const ps = typeof window === 'object'
  ? new PromiseWorker(new PdfWorker())
  : null!

export const getItem = async (option: Option) => {
  return ps.postMessage<string, Option>(option)
}

