import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import { VitePWA } from 'vite-plugin-pwa'

const banner = `/*!
 * @license プロキシカード印刷
 * https://proxy-card.imasanari.dev
 * 
 * MIT License
 * Copyright (c) 2020 iMasanari
 */`

// https://vitejs.dev/config/
export default defineConfig(({ mode, ssrBuild }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID

  return {
    legacy: {
      buildSsrCjsExternalHeuristics: true,
    },
    build: {
      rollupOptions: {
        input: {
          ja: `${__dirname}/index.html`,
          en: `${__dirname}/en/index.html`,
          'zh-hans': `${__dirname}/zh-hans/index.html`,
        },
        output: {
          banner,
          interop: ssrBuild ? 'auto' : undefined,
        },
      },
      assetsInlineLimit: 0,
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
      rollupOptions: {
        output: {
          banner,
        },
      },
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
      VitePWA({
        registerType: 'autoUpdate',
        manifest: false,
        minify: false,
        workbox: { navigateFallback: '/404.html' },
      }),
    ],
  }
})
