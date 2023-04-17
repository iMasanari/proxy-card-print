import { distance, dhashFromImageData, ImageDataLike } from 'isomorphic-image-hash'
import registerPromiseWorker from 'promise-worker/register'
import { toBin } from '../utils/baseConverter'

export interface Option {
  image: ImageDataLike
}

let getHashList = async () => {
  const fn = async () => {
    const res = await fetch(`${import.meta.env.VITE_HASH_API_URL}v2/hash-list.json`)
    const json: string[] = await res.json()

    return json.map(hash => ({ hash, bin: toBin(hash) }))
  }

  const promise = fn()

  // TODO: リトライ処理を追加する
  getHashList = () => promise

  return await promise
}

registerPromiseWorker<Option, string>(async (option) => {
  const hash = dhashFromImageData(option.image)
  const hashDataList = await getHashList()

  const result = hashDataList.reduce((acc, v) => {
    const compare = distance(v.bin, hash)

    if (compare > acc.compare) return acc

    return { compare, hash: v.hash }

  }, { compare: Infinity, hash: '' })

  return result.hash
})
