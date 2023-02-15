import { readFile, writeFile } from 'fs/promises'
import createEmotionServer from '@emotion/server/create-instance'
import { renderToString } from 'react-dom/server'
import App, { cache } from './app/App'
import { initI18n } from './app/i18n'
import enTranslation from '~/locales/en/translation.json'
import jaTranslation from '~/locales/ja/translation.json'
import zhHansTranslation from '~/locales/zh-hans/translation.json'

const resources = {
  ja: jaTranslation,
  en: enTranslation,
  'zh-Hans': zhHansTranslation,
}

const generate = async (path: string, lang: keyof typeof resources) => {
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache)
  const html = await readFile(path, 'utf-8')
  const i18n = initI18n(lang, resources[lang])
  const app = renderToString(<App i18n={i18n} />)
  const chunks = extractCriticalToChunks(app)
  const styles = constructStyleTagsFromChunks(chunks)

  const result = html
    .replace('<!--app-html-->', app)
    .replace('</head>', `  ${styles}\n</head>`)

  await writeFile(path, result)
}

const main = async () => {
  await generate('./dist/index.html', 'ja')
  await generate('./dist/en/index.html', 'en')
  await generate('./dist/zh-hans/index.html', 'zh-Hans')
}

main()
