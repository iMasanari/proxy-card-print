import { OnBeforeRenderAsync } from 'vike/types'
import { getPosts } from '~/articles/article-service'

export interface Post {
  id: string
  title: string
}

export interface ArticlesPageProps {
  posts: Post[]
}

export const onBeforeRender: OnBeforeRenderAsync = async (): ReturnType<OnBeforeRenderAsync> => {
  const documentProps = {
    locale: 'ja',
    title: 'プロキシカード印刷｜PCスマホで簡単作成、コンビニ印刷！',
    description: '',
  }

  const res = await getPosts()

  const posts = res.map(v => ({ id: v.id, title: v.title }))

  const pageProps = { posts } satisfies ArticlesPageProps
  return {
    pageContext: {
      pageProps,
      documentProps,
    },
  }
}
