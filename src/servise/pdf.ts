import PromiseWorker from 'promise-worker'
import { Condition, Result } from '~/worker/createPdf'

const promiseWorker = process.browser
  ? new PromiseWorker(new Worker(new URL('~/worker/index.worker.ts', import.meta.url)))
  : null!

export const createPdf = (condition: Condition) =>
  promiseWorker.postMessage<Result, Condition>(condition)
