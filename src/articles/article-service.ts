import { createClient } from 'microcms-js-sdk'

const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
})

interface ResultList<T> {
  contents: T[]
  totalCount: number
  offset: number
  limit: number
}

export interface Article {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  title: string
  content: string
  // eyecatch: any
  // category: any
}

export const getPosts = async () => {
  // TODO 100件上限対応
  const res = await client.get<ResultList<Article>>({ endpoint: 'articles' })

  return res.contents
}

export const getPost = async (contentId: string, draftKey?: string) => {
  const res = await client.get<Article>({
    endpoint: 'articles',
    contentId,
    queries: { draftKey },
  })

  return res
}
