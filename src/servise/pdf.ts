import PromiseWorker from 'promise-worker'
import { Condition, Result } from '~/worker/createPdf'
import WebpackWorker from '~/worker/index.worker'

const promiseWorker = new PromiseWorker(new WebpackWorker())

export const createPdf = (condition: Condition) =>
  promiseWorker.postMessage<Result, Condition>(condition)
