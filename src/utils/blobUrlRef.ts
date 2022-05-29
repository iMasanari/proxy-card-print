import { useLayoutEffect } from 'react'

interface Ref {
  value: string
  count: number
}

const blobMap = new Map<Blob | MediaSource, Ref>()

export const createBlobURLRef = (blob: Blob | MediaSource) => {
  let ref = blobMap.get(blob)!
  let isRevoked = false

  if (ref) {
    ++ref.count
  } else {
    ref = {
      value: URL.createObjectURL(blob),
      count: 1,
    }

    blobMap.set(blob, ref)
  }

  return {
    get value() {
      return ref.value
    },
    revoke: () => {
      if (isRevoked) {
        return
      }

      isRevoked = true

      if (--ref.count) {
        return
      }

      URL.revokeObjectURL(ref.value)
      blobMap.delete(blob)
    },
  }
}

export const useBlobUrl = (blob: Blob, setter: (url: string) => void) => {
  useLayoutEffect(() => {
    const blobUrl = createBlobURLRef(blob)

    setter(blobUrl.value)

    return () => {
      blobUrl.revoke()
    }
    // eslint-disable-next-line
  }, [blob])
}
