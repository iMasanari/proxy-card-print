import { hydrateRoot } from 'react-dom/client'
import type { OnRenderClientAsync } from 'vike/types'

// https://vike.dev/onRenderClient
// This onRenderClient() hook only supports SSR, see https://vike.dev/render-modes for how to modify onRenderClient()
// to support SPA
export const onRenderClient: OnRenderClientAsync = async (pageContext): ReturnType<OnRenderClientAsync> => {
  const { Page, pageProps } = pageContext

  if (!Page) {
    throw new Error('Client-side render() hook expects pageContext.Page to be defined')
  }

  const root = document.getElementById('app')!

  hydrateRoot(
    root,
    <Page {...pageProps} />
  )
}
