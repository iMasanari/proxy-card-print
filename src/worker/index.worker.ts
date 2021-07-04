import registerPromiseWorker from 'promise-worker/register'
import createPdf, { Condition, Result } from './createPdf'

registerPromiseWorker<Condition, Result>(createPdf)
