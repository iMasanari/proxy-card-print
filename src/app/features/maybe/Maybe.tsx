import { css } from '@emotion/react'
import { List, ListItem, ListItemButton, ListItemText, Theme, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { SettingsCard } from '../cards/cardsReducer'
import { getItem } from './items'

interface Props {
  cards: SettingsCard[]
}

interface CardData {
  name: string
  category: string | undefined
  url: string
}

interface CardDataList {
  id: number
  list: CardData[]
}

const categoryRecord: Record<string, string | undefined> = {
  yugioh: '遊戯王',
  duelmasters: 'デュエル・マスターズ',
  onepiece: 'ONE PIECE カードゲーム',
  pokemon: 'ポケモンカード',
}

const relatedItemRecord: Record<string, string[] | undefined> = {
  'デュエル・マスターズ': [
    // デュエル･マスターズ-TCG-DM22-BD1-レジェンドスーパーデッキ-龍覇爆炎
    'B0BHXZWNJ7',
    // デュエル･マスターズ-DM22-RP2-デュエル･マスターズTCG-ゴッド･オブ･アビス-第2弾「轟炎の竜皇」
    'B0BM3QNP9Y',
  ],
  'ONE PIECE カードゲーム': [
    // バンダイ (BANDAI) ONE PIECEカードゲーム 強大な敵【OP-03】
    'B0BNPD7YV2',
    // バンダイ (BANDAI) ONE PIECEカードゲーム 頂上決戦【OP-02】(BOX)
    'B0BFPL66LS',
  ],
  'ポケモンカード': [
    // ポケモンカードゲーム ソード＆シールド ハイクラスパック VSTARユニバース BOX
    'B0B6H9PTBW',
    // ポケモンカードゲーム-スカーレット-バイオレット-強化拡張パック-トリプレットビート
    'B0BNKCS8L1',
  ],
}

const listStyle = (theme: Theme) => css`
  list-style: none;
  padding: ${theme.spacing(0, 1)};
  margin: 0;
  display: flex;
  overflow-x: auto;
  gap: ${theme.spacing(1)};
`
const itemStyle = css`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
`

const ItemLoader = ({ card, setCardDataList }: { card: SettingsCard, setCardDataList: (fn: (v: CardDataList[]) => CardDataList[]) => void }) => {
  useEffect(() => {
    const asyncDestructor = (async () => {
      const src = URL.createObjectURL(card.file)
      const image = new Image()

      await new Promise(resolve => {
        image.onload = resolve
        image.src = src
      })

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!

      canvas.width = image.width
      canvas.height = image.height

      ctx.drawImage(image, 0, 0)

      const pixcelData = ctx.getImageData(0, 0, image.width, image.height)

      // TODO: エラーキャッチ
      const cardNames = await getItem({ image: pixcelData }).catch(() => [])

      const cardDataList = cardNames.map(v => {
        const url = new URL('https://www.amazon.co.jp/s')
        url.searchParams.set('k', `${v.name} ${categoryRecord[v.category] || ''}`)

        if (import.meta.env.VITE_AMAZON_ASSOCIATE_ID) {
          url.searchParams.set('tag', import.meta.env.VITE_AMAZON_ASSOCIATE_ID)
        }

        return { name: v.name, category: categoryRecord[v.category], url: url.toString() }
      })

      setCardDataList(list => [...list, { id: card.id, list: cardDataList }])

      URL.revokeObjectURL(src)

      return () => setCardDataList(list => list.filter(v => v.id !== card.id))
    })()

    return () => {
      asyncDestructor.then(fn => fn())
    }
  }, [card.id, card.file, setCardDataList])

  return null
}

export default ({ cards }: Props) => {
  const [cardDataList, setCardDataList] = useState<CardDataList[]>([])

  const cardList = cardDataList.flatMap(v => v.list)
  const categoryList = Array.from(new Set(cardDataList.flatMap(v => v.list.flatMap(w => w.category || [])))).sort()
  const itemList = categoryList.flatMap(category => relatedItemRecord[category] || [])

  return (
    <div>
      {cards.map(card =>
        <ItemLoader key={card.id} card={card} setCardDataList={setCardDataList} />
      )}
      <Typography variant="body2" fontWeight="bolder" sx={{ textAlign: 'center' }}>
        もしかして(β)
      </Typography>
      <List>
        {cardList.map(v =>
          <ListItem key={v.name} disablePadding>
            <ListItemButton href={v.url} target="_blank" rel="noopener">
              <ListItemText
                primary={
                  <>
                    {v.category ? <Typography variant="caption" display="block">{v.category}</Typography> : null}
                    {v.name}
                  </>
                }
                secondary="Amazonで価格を見る"
              />
            </ListItemButton>
          </ListItem>
        )}
      </List>
      {import.meta.env.VITE_AMAZON_ASSOCIATE_ID && (
        <>
          <Typography variant="body2" fontWeight="bolder" sx={{ textAlign: 'center' }} gutterBottom>
            関連商品
          </Typography>
          <ul css={listStyle}>
            {itemList.map(asin =>
              <li key={asin} css={itemStyle}>
                <iframe
                  loading="lazy"
                  sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin"
                  style={{ width: 120, height: 240 }}
                  marginWidth={0}
                  marginHeight={0}
                  scrolling="no"
                  frameBorder={0}
                  src={`//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=${import.meta.env.VITE_AMAZON_ASSOCIATE_ID}&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=${asin}`}
                />
              </li>
            )}
          </ul>
        </>
      )}
      <Typography variant="body2" fontSize="0.7em" p={1} gutterBottom>
        ※追加した画像から上記リンクを生成しています。カード識別はこの端末上で行われ、追加した画像がサーバー等に送信されることはありません（カード識別後、そのカードの名称を取得するためにサーバーとの通信を行うことがあります）。<br />
        識別対応カード: 遊戯王、ポケカ、ワンピ、デュエマ
      </Typography>
    </div>
  )
}
