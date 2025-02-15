import { useState } from 'react'
import Article from '~/articles/Article'
import { Article as IArticle } from '~/articles/article-service'
import { initI18n } from '~/common/i18n'
import Layout from '~/common/layouts/Layout'

export const Page = (props: IArticle) => {
  const [i18n] = useState(initI18n('ja', undefined))

  return (
    <Layout i18n={i18n}>
      <Article post={props} />
    </Layout>
  )
}
