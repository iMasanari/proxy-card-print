import PromiseWorker from 'promise-worker'
import { Option } from './items.worker'
import AffiliateWorker from './items.worker?worker'

interface CardData {
  category: string
  name: string
}

const ps = typeof window === 'object'
  ? new PromiseWorker(new AffiliateWorker())
  : null!

export const getItem = async (option: Option) => {
  const cardHash = await ps.postMessage<string, Option>(option)

  const url = `${import.meta.env.VITE_HASH_API_URL}v2/cards/${cardHash.slice(0, 2).toLowerCase()}.json`

  const res = await fetch(url, {
    mode: 'cors',
  })

  const json = await res.json()

  return json[cardHash] as CardData[]
}

