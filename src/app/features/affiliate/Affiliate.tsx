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
}

const Item = ({ card }: { card: Blob }) => {
  const [asin, setAsin] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      const src = URL.createObjectURL(card)

      const asin = await getItem({ image: src })

      setAsin(asin)

      URL.revokeObjectURL(src)
    })()

  }, [card])

  if (!asin) return null

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=imasanari-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=${asin}"></iframe>`,
      }}
    />
  )
}

export default ({ cards }: Props) => {
  return (
    <div>
      <Typography variant="body2" gutterBottom fontWeight="bolder" sx={{ textAlign: 'center' }}>
        もしかして(β)
      </Typography>
      <ul css={listStyle}>
        {cards.map(card =>
          <li key={card.id} css={itemStyle}>
            <Item card={card.file} />
          </li>
        )}
      </ul>
      <Typography variant="body2" fontSize="0.7em" p={1} gutterBottom>
        ※追加した画像をもとに、上記リンクを生成しています（現在は一部のワンピースカードのみ対応）。リンク生成はこの端末上で行われるので、追加した画像がサーバー等に送信されることはありません。
      </Typography>
    </div>
  )
}
