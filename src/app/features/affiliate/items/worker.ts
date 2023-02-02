import Jimp from 'jimp/browser/lib/jimp'
import registerPromiseWorker from 'promise-worker/register'
import onepiece from '../data/onepiece.json'

export interface Option {
  image: string
}

registerPromiseWorker<Option, string>(async (option) => {
  const image = await Jimp.read(option.image)
  const hash = image.hash()

  const result = onepiece.reduce((acc, v) => {
    const compare = Jimp.compareHashes(v.hash, hash)

    if (compare > acc.compare) return acc

    return { compare, asin: v.asin }

  }, { compare: Infinity, asin: '' })

  return result.asin
})
