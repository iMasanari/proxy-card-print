import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID
  const BASE_PATH = process.env.BASE_PATH || '/'

  return {
    base: BASE_PATH,
    legacy: {
      buildSsrCjsExternalHeuristics: true,
    },
    build: {
      rollupOptions: {
        input: {
          ja: resolve(__dirname, 'index.html'),
          en: resolve(__dirname, 'en/index.html'),
        },
      },
    },
    resolve: {
      alias: {
        canvg: './src/noop.ts',
        dompurify: './src/noop.ts',
        html2canvas: './src/noop.ts',
      },
    },
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
    worker: {
      format: 'es',
    },
    optimizeDeps: {
      include: ['@emotion/react/jsx-dev-runtime'],
    },
    plugins: [
      tsconfigPaths(),
      handlebars({
        context: { GOOGLE_ANALYTICS_ID, BASE_PATH },
      }),
      react({
        jsxRuntime: 'automatic',
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
    ],
  }
})
