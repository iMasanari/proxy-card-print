import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import handlebars from 'vite-plugin-handlebars'

// https://vitejs.dev/config/
export default defineConfig(({ mode, ssrBuild }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID

  return {
    root: 'src',
    publicDir: `${__dirname}/public`,
    legacy: {
      buildSsrCjsExternalHeuristics: true,
    },
    build: {
      outDir: ssrBuild ? `${__dirname}/generated` : `${__dirname}/dist`,
      rollupOptions: {
        input: {
          ja: `${__dirname}/src/index.html`,
          en: `${__dirname}/src/en/index.html`,
        },
      },
    },
    resolve: {
      alias: {
        '~/': `${__dirname}/src/`,
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
    ],
  }
})
