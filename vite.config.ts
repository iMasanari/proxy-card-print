import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, PluginOption } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import mdx from 'vite-plugin-mdx'
import tsconfigPaths from 'vite-tsconfig-paths'

const entrySsgPath = './generated/ssg/entry-ssg'

const ssg = (): PluginOption => ({
  name: 'ssg',
  enforce: 'post',
  transformIndexHtml: (html: string) => {
    const { render } = require(entrySsgPath) as typeof import('./src/entry-ssg')
    const app = render()

    return html
      .replace('<!--app-html-->', app.html)
      .replace('</head>', `  ${app.styles}\n</head>`)
  },
})

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID
  const BASE_PATH = process.env.BASE_PATH

  return {
    base: BASE_PATH,
    worker: {
      format: 'es',
    },
    plugins: [
      tsconfigPaths(),
      handlebars({
        context: { GOOGLE_ANALYTICS_ID },
      }),
      react({
        jsxRuntime: 'automatic',
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
      mdx(),
      mode === 'production' && ssg(),
    ],
  }
})
