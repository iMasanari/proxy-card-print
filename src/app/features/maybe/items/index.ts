import PromiseWorker from 'promise-worker'
import { Option } from './worker'
import AffiliateWorker from './worker?worker'

const ps = typeof window === 'object'
  ? new PromiseWorker(new AffiliateWorker())
  : null!

export const getItem = async (option: Option) => {
  const cardHash = await ps.postMessage<string, Option>(option)

  const res = await fetch(`${import.meta.env.VITE_HASH_API_URL}v1/${cardHash.slice(0, 2).toLowerCase()}.json`, {
    mode: 'cors',
  })

  const json = await res.json()

  return json[cardHash].map((v: any) => v.name) as string[]
}

