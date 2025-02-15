import { OnBeforeRenderAsync } from 'vike/types'
import { getPost } from '~/articles/article-service'
import { PageProps } from '~/renderer/types'

export interface ArticlePageProps {
  id: string
  title: string
}

export const onBeforeRender: OnBeforeRenderAsync = async (context): ReturnType<OnBeforeRenderAsync> => {
  // dev実行時のみ
  const draftKey = context.urlParsed.search.draftKey

  const post = await getPost(context.routeParams.article, draftKey)

  const pageProps = post satisfies ArticlePageProps as unknown as PageProps

  const documentProps = {
    locale: 'ja',
    title: `${post.title}｜プロキシカード印刷`,
    description: '',
  }

  return {
    pageContext: {
      pageProps,
      documentProps,
    },
  }
}
