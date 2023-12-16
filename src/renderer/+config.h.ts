import type { Config } from 'vike/types'

// https://vike.dev/config
export default {
  passToClient: ['pageProps', 'urlPathname'],
  meta: {
    title: {
      env: { server: true, client: true },
    },
    description: {
      env: { server: true },
    },
    favicon: {
      env: { server: true },
    },
    lang: {
      env: { server: true },
    },
  },
} satisfies Config
