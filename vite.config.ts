import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import mdx from 'vite-plugin-mdx'
import tsconfigPaths from 'vite-tsconfig-paths'

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
        context: {
          GOOGLE_ANALYTICS_ID: GOOGLE_ANALYTICS_ID,
        },
      }),
      react({
        jsxRuntime: 'automatic',
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
      mdx(),
    ],
  }
})
