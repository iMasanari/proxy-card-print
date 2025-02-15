import { OnBeforeRenderAsync } from 'vike/types'
import { getPost } from '~/articles/article-service'
import { PageProps } from '~/renderer/types'

export interface ArticlePageProps {
  id: string
  title: string
}

export const onBeforeRender: OnBeforeRenderAsync = async (context): ReturnType<OnBeforeRenderAsync> => {
  const documentProps = {
    locale: 'ja',
    title: 'プロキシカード印刷｜PCスマホで簡単作成、コンビニ印刷！',
    description: '',
  }

  // dev実行時のみ
  const draftKey = context.urlParsed.search.draftKey

  const post = await getPost(context.routeParams.article, draftKey)

  const pageProps = post satisfies ArticlePageProps as unknown as PageProps

  return {
    pageContext: {
      pageProps,
      documentProps,
    },
  }
}
