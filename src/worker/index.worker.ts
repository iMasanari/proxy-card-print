import registerPromiseWorker from 'promise-worker/register'
import createPdf, { Condition } from './createPdf'

registerPromiseWorker<Condition, string>(createPdf)

// webpack worker
export default null as unknown as { new(): Worker }
