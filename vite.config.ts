import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'
import { UserConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

const banner = `/*!
 * @license プロキシカード印刷
 * https://proxy-card.imasanari.dev
 * 
 * MIT License
 * Copyright (c) 2020 iMasanari
 */`

// https://vitejs.dev/config/
export default {
  build: {
    rollupOptions: {
      output: {
        banner,
      },
    },
    assetsInlineLimit: 0,
  },
  resolve: {
    alias: {
      '~/': `${__dirname}/src/`,
      'canvg': `${__dirname}/src/noop.ts`,
      'dompurify': `${__dirname}/src/noop.ts`,
      'html2canvas': `${__dirname}/src/noop.ts`,
    },
  },
  worker: {
    format: 'es',
    rollupOptions: {
      output: {
        banner,
      },
    },
  },
  ssr: {
    noExternal: [
      // fake esm packages
      'react-easy-crop',
      'tslib',
    ],
  },
  optimizeDeps: {
    include: ['@emotion/react/jsx-dev-runtime'],
  },
  plugins: [
    react({
      jsxRuntime: 'automatic',
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    vike({
      prerender: true,
      trailingSlash: true,
    }),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: false,
      minify: false,
      workbox: { navigateFallback: '/404.html' },
    }),
  ],
} satisfies UserConfig
