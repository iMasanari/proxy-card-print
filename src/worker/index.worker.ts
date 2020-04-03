import registerPromiseWorker from 'promise-worker/register'
import '~/worker/register-files'
import createPdf, { Condition } from './createPdf'

registerPromiseWorker<Condition, string>(createPdf)

export default null as unknown as { new(): Worker }
