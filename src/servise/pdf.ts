import PromiseWorker from 'promise-worker'
import { Condition, Result } from '~/worker/createPdf'
import WebpackWorker from '~/worker/index.worker'

const promiseWorker = process.browser ? new PromiseWorker(new WebpackWorker()) : null!

export const createPdf = (condition: Condition) =>
  promiseWorker.postMessage<Result, Condition>(condition)
