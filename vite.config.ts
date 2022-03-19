import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { ViteEjsPlugin } from 'vite-plugin-ejs'
import mdx from 'vite-plugin-mdx'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    base: process.env.BASE_PATH,
    worker: {
      format: 'es',
    },
    plugins: [
      ViteEjsPlugin({
        GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
      }),
      tsconfigPaths(),
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
