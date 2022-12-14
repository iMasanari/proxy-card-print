import { readFileSync, writeFileSync } from 'fs'
import createEmotionServer from '@emotion/server/create-instance'
import { renderToString } from 'react-dom/server'
import App, { cache } from './App'

const path = './dist/index.html'
const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache)

const html = readFileSync(path, 'utf-8')
const app = renderToString(<App />)
const chunks = extractCriticalToChunks(app)
const styles = constructStyleTagsFromChunks(chunks)

const result = html
  .replace('<!--app-html-->', app)
  .replace('</head>', `  ${styles}\n</head>`)

writeFileSync(path, result)
