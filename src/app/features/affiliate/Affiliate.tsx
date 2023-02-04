import { css } from '@emotion/react'
import { Theme, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { SettingsCard } from '../cards/cardsReducer'
import { getItem } from './items'

const listStyle = (theme: Theme) => css`
  list-style: none;
  padding: ${theme.spacing(0, 1)};
  margin: 0;
  display: flex;
  overflow-x: auto;
  gap: ${theme.spacing(1)};
  ${theme.breakpoints.up('sm')} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0;
    justify-items: center;
  }
`

const itemStyle = css`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
`

interface Props {
  cards: SettingsCard[]
  associateId: string
}

const Item = ({ card, associateId }: { card: Blob, associateId: string }) => {
  const [asin, setAsin] = useState<string | null>(null)

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
      const asin = await getItem({ image: pixcelData })

      setAsin(asin)

      URL.revokeObjectURL(src)
    })()

  }, [card])

  if (!asin) {
    return null
  }

  return (
    <iframe
      loading="lazy"
      sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin"
      style={{ width: 120, height: 240 }}
      marginWidth={0}
      marginHeight={0}
      scrolling="no"
      frameBorder={0}
      src={`//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=${associateId}&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=${asin}`}
    />
  )
}

export default ({ cards, associateId }: Props) => {
  return (
    <div>
      <Typography variant="body2" gutterBottom fontWeight="bolder" sx={{ textAlign: 'center' }}>
        もしかして(β)
      </Typography>
      <ul css={listStyle}>
        {cards.map(card =>
          <li key={card.id} css={itemStyle}>
            <Item card={card.file} associateId={associateId} />
          </li>
        )}
      </ul>
      <Typography variant="body2" fontSize="0.7em" p={1} gutterBottom>
        ※追加した画像をもとに、上記リンクを生成しています。リンク生成はこの端末上で行われるので、追加した画像がサーバー等に送信されることはありません。
      </Typography>
    </div>
  )
}
