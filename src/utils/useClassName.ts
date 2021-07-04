import { CacheProvider, EmotionCache, SerializedStyles } from '@emotion/react'
import { insertStyles } from '@emotion/utils'
import { Context, useContext, useMemo } from 'react'

// https://github.com/emotion-js/emotion/issues/1853

const EmotionCacheContext: Context<EmotionCache> = (CacheProvider as any)._context

export const useClassName = (style: string | SerializedStyles) => {
  const cache = useContext(EmotionCacheContext)

  const className = useMemo(() => {
    if (typeof style === 'string') {
      return style
    }

    insertStyles(cache, style, false)
    return `${cache.key}-${style.name}`
  }, [cache, style])

  return className
}
