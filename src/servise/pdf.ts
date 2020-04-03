import PromiseWorker from 'promise-worker'
import { Condition } from '~/worker/createPdf'

const promiseWorker = new PromiseWorker(new Worker('~/worker/index.ts'))

export const createPdf = (condition: Condition) =>
  promiseWorker.postMessage<string, Condition>(condition)
