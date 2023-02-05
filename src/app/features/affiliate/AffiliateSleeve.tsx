import { css } from '@emotion/react'
import { Theme, Typography } from '@mui/material'

const listStyle = (theme: Theme) => css`
  list-style: none;
  padding: ${theme.spacing(0, 1)};
  margin: 0;
  overflow-x: auto;
  display: grid;
  grid-auto-flow: column;
  gap: ${theme.spacing(1)};
  ${theme.breakpoints.up('sm')} {
    grid-auto-flow: row;
    grid-template-columns: repeat(auto-fill, 120px);
    justify-content: center;
  }
`

const itemStyle = css`
  padding: 0;
  margin: 0;
`

interface Props {
  associateId: string
}

const sleeves = [
  // Shadowverse EVOLVE 公式スリーブ Vol.25 Shadowverse EVOLVE『ラプラトン星』
  'B09ZP8NTX7',
  // キャラクタースリーブ お隣の天使様にいつの間にか駄目人間にされていた件 白河千歳 (EN-1180) パック
  'B0BSW12L65',
  // テネセシート イケメン ゴリラ スリーブ 【ゴリ押し】60枚
  'B09PJ2C36Q',
  // 星のカービィ 30th キャラクタースリーブ エアライドマシン(EN-1089) パック
  'B0B38B2W8M',
  // ブシロードスリーブコレクション ハイグレード Vol.3419 リコリス・リコイル『キービジュアル第1弾』
  'B0BM3GG3BW',
  // ブシロード スリーブコレクション ハイグレード Vol.3449 『ちいかわ』
  'B0BNX94LWH',
]

export default ({ associateId }: Props) => {
  return (
    <aside>
      <Typography variant="body2" gutterBottom fontWeight="bolder" sx={{ textAlign: 'center' }}>
        おすすめスリーブ
      </Typography>
      <ul css={listStyle}>
        {sleeves.map(asin =>
          <li key={asin} css={itemStyle}>
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
          </li>
        )}
      </ul>
    </aside>
  )
}
