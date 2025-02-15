import { useState } from 'react'
import { ArticlesPageProps } from './+onBeforeRender'
import Articles from '~/articles/Articles'
import { initI18n } from '~/common/i18n'
import Layout from '~/common/layouts/Layout'

export const Page = ({ posts }: ArticlesPageProps) => {
  const [i18n] = useState(initI18n('ja', undefined))

  return (
    <Layout i18n={i18n} isTopPage={false}>
      <Articles posts={posts} />
    </Layout>
  )
}
