import registerPromiseWorker from 'promise-worker/register'
import duelmasters from '../data/duelmasters.json'
import onepiece from '../data/onepiece.json'
import pokemon from '../data/pokemon.json'
import yugioh from '../data/yugioh.json'
import { toBin } from '../utils/baseConverter'
import { distance, getHash } from '../utils/dhash'
import { ImagePixelData } from '../utils/resize'

export interface Option {
  image: ImagePixelData
}

const toCardList = (data: Record<string, string>) =>
  Object.keys(data).map(asin => ({ asin, hash: toBin(data[asin]) }))

const cardList = [
  ...toCardList(duelmasters),
  ...toCardList(onepiece),
  ...toCardList(pokemon),
  ...toCardList(yugioh),
]

registerPromiseWorker<Option, string>(async (option) => {
  const hash = getHash(option.image)

  const result = cardList.reduce((acc, v) => {
    const compare = distance(v.hash, hash)

    if (compare > acc.compare) return acc

    return { compare, asin: v.asin }

  }, { compare: Infinity, asin: '' })

  return result.asin
})
