import { useState } from 'react'
import { PageProps } from './+onBeforeRender'
import App from '~/app/App'
import { initI18n } from '~/app/i18n'

export function Page({ locale, translation }: PageProps) {
  const [i18n] = useState(() => initI18n(locale, translation))

  return <App i18n={i18n} />
}
