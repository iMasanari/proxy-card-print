import { useLayoutEffect, useState } from 'react'

interface Ref {
  value: string
  count: number
}

const blobMap = new Map<Blob | MediaSource, Ref>()

export const createBlobURLRef = (blob: Blob | MediaSource, label: string) => {
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

export const useBlobUrl = (blob: Blob, label: string) => {
  const [url, setUrl] = useState<string>()

  useLayoutEffect(() => {
    const ref = createBlobURLRef(blob, label)

    setUrl(ref.value)

    return () => {
      Promise.resolve().then(ref.revoke)
    }
  }, [blob, label])

  return url
}
