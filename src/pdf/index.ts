import PromiseWorker from 'promise-worker'
import { Option } from './worker'

const ps = typeof window === 'object' ?
  new PromiseWorker(new Worker(new URL('./worker.ts', import.meta.url)))
  : null!

export const createPdfFile = (option: Option) =>
  ps.postMessage<string, Option>(option)
