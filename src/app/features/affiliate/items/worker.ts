import Jimp from 'jimp/browser/lib/jimp'
import registerPromiseWorker from 'promise-worker/register'
import duelmasters from '../data/duelmasters.json'
import onepiece from '../data/onepiece.json'
import pokemon from '../data/pokemon.json'
import yugioh from '../data/yugioh.json'

export interface Option {
  image: string
}

const cardList = [
  ...duelmasters,
  ...onepiece,
  ...pokemon,
  ...yugioh,
]

registerPromiseWorker<Option, string>(async (option) => {
  const image = await Jimp.read(option.image)
  const hash = image.hash()

  const result = cardList.reduce((acc, v) => {
    const compare = Jimp.compareHashes(v.hash, hash)

    if (compare > acc.compare) return acc

    return { compare, asin: v.asin }

  }, { compare: Infinity, asin: '' })

  return result.asin
})
