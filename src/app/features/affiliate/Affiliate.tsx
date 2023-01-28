import { css } from '@emotion/react'
import { Theme, Typography } from '@mui/material'

const items = [
  // Shadowverse EVOLVE 公式スリーブ Vol.25 Shadowverse EVOLVE『ラプラトン星』
  '<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=imasanari-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B09ZP8NTX7&linkId=73843a9914de702db33165d5e8669da3"></iframe>',
  // キャラクタースリーブ お隣の天使様にいつの間にか駄目人間にされていた件 白河千歳 (EN-1180) パック
  '<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=imasanari-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B0BSW12L65&linkId=6e2531844d9a47f4e6ddce0d764e7498"></iframe>',
  // テネセシート イケメン ゴリラ スリーブ 【ゴリ押し】60枚
  '<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginWidth="0" marginHeight="0" scrolling="no" frameBorder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=imasanari-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B09PJ2C36Q&linkId=e6589b34db8083db2d3a5369b0b9e376"></iframe>',
  // 星のカービィ 30th キャラクタースリーブ エアライドマシン(EN-1089) パック
  '<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=imasanari-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B0B38B2W8M&linkId=83d2a3de539fd35eb562d45b6ee1ab4e"></iframe>',
  // ブシロードスリーブコレクション ハイグレード Vol.3419 リコリス・リコイル『キービジュアル第1弾』
  '<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=imasanari-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B0BM3GG3BW&linkId=90e9e6e67ee8dbb30d7455fdd5f37cf8"></iframe>',
  // ブシロード スリーブコレクション ハイグレード Vol.3449 『ちいかわ』
  '<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=imasanari-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B0BNX94LWH&linkId=fdd4a159704f9e8c2d0f6215652856fe"></iframe>',
]

const listStyle = (theme: Theme) => css`
  list-style: none;
  padding: ${theme.spacing(0, 1)};
  margin: 0;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: ${theme.spacing(1)};
  ${theme.breakpoints.up('sm')} {
    flex-wrap: wrap;
    justify-content: center;
  }
`

const itemStyle = css`
  padding: 0;
  margin: 0;
`

export default () => {
  return (
    <div>
      <Typography variant="body2" gutterBottom fontWeight="bolder" sx={{ textAlign: 'center' }}>
        おすすめスリーブ
      </Typography>
      <ul css={listStyle}>
        {items.map(item =>
          <li key={item} css={itemStyle} dangerouslySetInnerHTML={{ __html: item }} />
        )}
      </ul>
    </div>
  )
}
