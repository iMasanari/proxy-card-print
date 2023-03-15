import { List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { SettingsCard } from '../cards/cardsReducer'
import { getItem } from './items'

interface Props {
  cards: SettingsCard[]
}

interface CardData {
  name: string
  url: string
}

const Item = ({ card }: { card: Blob }) => {
  const [cardData, setCardNames] = useState<CardData[]>([])

  useEffect(() => {
    (async () => {
      const src = URL.createObjectURL(card)
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
      const cardNames = await getItem({ image: pixcelData }).catch((): string[] => [])

      setCardNames(cardNames.map(name => {
        const url = new URL('https://www.amazon.co.jp/s')
        url.searchParams.set('k', name)

        if (import.meta.env.VITE_AMAZON_ASSOCIATE_ID) {
          url.searchParams.set('tag', import.meta.env.VITE_AMAZON_ASSOCIATE_ID)
        }

        return { name, url: url.toString() }
      }))

      URL.revokeObjectURL(src)
    })()
  }, [card])

  return (
    <>
      {cardData.map(v =>
        <ListItem key={v.name} disablePadding>
          <ListItemButton href={v.url} target="_blank" rel="noopener">
            <ListItemText primary={v.name} secondary="Amazonで価格を見る" />
          </ListItemButton>
        </ListItem>
      )}
    </>
  )
}

export default ({ cards }: Props) => {
  return (
    <div>
      <Typography variant="body2" fontWeight="bolder" sx={{ textAlign: 'center' }}>
        もしかして(β)
      </Typography>
      <List>
        {cards.map(card =>
          <Item key={card.id} card={card.file} />
        )}
      </List>
      <Typography variant="body2" fontSize="0.7em" p={1} gutterBottom>
        ※追加した画像をもとに、上記リンクを生成しています。カード識別はこの端末上で行われるので、追加した画像がサーバー等に送信されることはありません。なお、この機能は一部のカードゲームのカードのみに対応しています。（現在は、ポケモンのスタンダードレギュレーションのカードとONEPIECEカード、デュエルマスターズのみ対応）
      </Typography>
    </div>
  )
}
