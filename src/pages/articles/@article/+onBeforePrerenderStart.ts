import type { OnBeforePrerenderStartAsync } from 'vike/types'
import { getPosts } from '~/articles/article-service'

export const onBeforePrerenderStart: OnBeforePrerenderStartAsync = async (): ReturnType<OnBeforePrerenderStartAsync> => {
  const articles = await getPosts()

  return articles.map(v => `/articles/${v.id}/`)
}
