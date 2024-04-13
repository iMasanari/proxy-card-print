import { OnBeforeRenderAsync } from 'vike/types'
import enTranslation from '~/locales/en/translation.json'
import zhHansTranslation from '~/locales/zh-hans/translation.json'

export interface PageProps {
  locale: string
  translation: any
}

interface LocaleData {
  title: string
  description: string
  translation: any
}

const defaultLocaleData = {
  title: 'プロキシカード印刷｜PCスマホで簡単作成、コンビニ印刷！',
  description: 'カードゲームのプロキシ(コピーカード)を簡単に作成・印刷できるWebアプリ。遊戯王やデュエマ、ポケモンカード、MTGなどのプロキシカードを作成できます。',
  translation: undefined,
}

const localeDataRecord: Map<string, LocaleData> = new Map([
  ['en', {
    title: 'Proxy Card Print | Easy creation with a PC and smartphone!',
    description: 'Web application to easily create and print proxy cards (copy cards) for card games. You can create proxy cards for Yu-Gi-Oh, Pokémon cards, Magic the Gathering, etc.',
    translation: enTranslation,
  }],
  ['zh-Hans', {
    title: '代理卡印刷 | 使用 PC 智能手机轻松创建！',
    description: '一种网络应用程序，可让您轻松创建和打印纸牌游戏的代理卡（复制卡）。 您可以为游戏王，卡片战斗先导者，万智牌等创建代理卡。',
    translation: zhHansTranslation,
  }],
])

export const onBeforeRender: OnBeforeRenderAsync = async ({ locale }): ReturnType<OnBeforeRenderAsync> => {
  const { title, description, translation } = localeDataRecord.get(locale) ?? defaultLocaleData

  const pageProps = {
    locale,
    translation,
  } satisfies PageProps

  const documentProps = {
    locale,
    title,
    description,
  }

  return {
    pageContext: {
      pageProps,
      documentProps,
    },
  }
}
