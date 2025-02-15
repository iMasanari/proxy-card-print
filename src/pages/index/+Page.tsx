import { useState } from 'react'
import { PageProps } from './+onBeforeRender'
import App from '~/app/App'
import { initI18n } from '~/common/i18n'
import Layout from '~/common/layouts/Layout'

export function Page({ locale, translation }: PageProps) {
  const [i18n] = useState(() => initI18n(locale, translation))

  return (
    <Layout i18n={i18n} isTopPage>
      <App />
    </Layout>
  )
}
