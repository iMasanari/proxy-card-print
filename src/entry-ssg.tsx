import createEmotionServer from '@emotion/server/create-instance'
import { renderToString } from 'react-dom/server'
import App, { cache } from './App'

export function render() {
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache)

  const html = renderToString(<App />)
  const chunks = extractCriticalToChunks(html)
  const styles = constructStyleTagsFromChunks(chunks)

  return { html, styles }
}
