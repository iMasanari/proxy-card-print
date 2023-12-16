type Page = (pageProps: PageProps) => React.ReactElement

export type PageProps = Record<string, unknown>

export interface DocumentProps {
  title?: string
  description?: string
  locale?: string
}

// https://vike.dev/pageContext#typescript
declare global {
  namespace Vike {
    interface PageContext {
      Page: Page
      urlPathname: string
      pageProps?: PageProps
      documentProps: DocumentProps
      locale: string,
      urlLogical: string
    }
  }
}
