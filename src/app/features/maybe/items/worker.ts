import registerPromiseWorker from 'promise-worker/register'
import hashList from '../data/hash-list.json'
import { toBin } from '../utils/baseConverter'
import { distance, getHash } from '../utils/dhash'
import { ImagePixelData } from '../utils/resize'

export interface Option {
  image: ImagePixelData
}

const hashDataList = hashList.map(hash => ({ hash, bin: toBin(hash) }))

registerPromiseWorker<Option, string>(async (option) => {
  const hash = getHash(option.image)

  const result = hashDataList.reduce((acc, v) => {
    const compare = distance(v.bin, hash)

    if (compare > acc.compare) return acc

    return { compare, hash: v.hash }

  }, { compare: Infinity, hash: '' })

  return result.hash
})
