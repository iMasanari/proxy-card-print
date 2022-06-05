import { css, Theme } from '@emotion/react'
import AddPhotoAlternate from '@mui/icons-material/AddPhotoAlternate'
import ContentCut from '@mui/icons-material/ContentCut'
import Print from '@mui/icons-material/Print'
import { Box, Card, Grid, Link, Typography, TypographyProps } from '@mui/material'

const usageStyle = css`
  overflow-y: auto;
  flex: 1;
  padding: 0 0.5rem;
`

const imageStyle = css`
  max-width: 100%;
`

const sectionStyle = (theme: Theme) => css`
  margin: ${theme.spacing(2, 0)};
`

const Title = (props: TypographyProps<'h2'>) =>
  <Typography component="h2" variant="h5" gutterBottom fontWeight="bold" {...props} />

const SubTitle = (props: TypographyProps<'h3'>) =>
  <Typography component="h3" variant="h6" gutterBottom fontWeight="bold" {...props} />

const Usage = () =>
  <div css={usageStyle}>
    <section css={sectionStyle}>
      <Title css={css`word-break: keep-all;`}>Webで<wbr />簡単 プロキシカード<wbr />作成</Title>
      <Typography gutterBottom>
        これはカードゲームのプロキシ(コピーカード)を簡単に印刷できるWebアプリです。PC・スマホの両方に対応しています。
        <br />
        また、印刷用データ(PDF)のダウンロードができるので、家にプリンタがなくても、コンビニ印刷(
        <Link href="https://www.printing.ne.jp/support/lite/index.html" target="_blank" rel="noopener">
          かんたん netprint
        </Link>
        等)を利用して作成できます。
      </Typography>
    </section>
    <section css={sectionStyle}>
      <Title>使い方</Title>
      <Grid component="ol" container spacing={2} maxWidth="lg" p={0} sx={{ listStyle: 'none' }}>
        <Grid component="li" item xs={12} md={4}>
          <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
            <SubTitle>1. 画像を選ぶ</SubTitle>
            <Box textAlign="center">
              <AddPhotoAlternate sx={{ fontSize: '8em', verticalAlign: 'text-top', color: '#555' }} />
            </Box>
            <Typography textAlign="justify">
              「カード追加」から、印刷したい画像を選択します。
            </Typography>
          </Card>
        </Grid>
        <Grid component="li" item xs={12} md={4}>
          <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
            <SubTitle>2. 印刷する</SubTitle>
            <Box textAlign="center">
              <Print sx={{ fontSize: '8em', verticalAlign: 'text-top', color: '#555' }} />
            </Box>
            <Typography textAlign="justify">
              「印刷/ダウンロード」ボタンから、印刷を行います。印刷はフチなし印刷、または拡大・縮小無し(倍率 100%/用紙に合わせる)で印刷してください。
            </Typography>
          </Card>
        </Grid>
        <Grid component="li" item xs={12} md={4}>
          <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
            <SubTitle>3. カットする</SubTitle>
            <Box textAlign="center">
              <ContentCut sx={{ fontSize: '8em', verticalAlign: 'text-top', color: '#555' }} />
            </Box>
            <Typography textAlign="justify">
              トンボ線に合わせ、カッターナイフなどでカットしてください。
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </section>
    <section css={sectionStyle}>
      <Title>カードサイズについて</Title>
      <Typography gutterBottom>
        作成するプロキシの種類によって、サイズを変更してください。
      </Typography>
      <ul>
        <li>スモールサイズ (59mm x 86mm)
          <ul>
            <li>バトルスピリッツ、遊戯王OCG、ミラクルバトルカードダス、ヴァンガード</li>
          </ul>
        </li>
        <li>スタンダードサイズ (63mm x 88mm)
          <ul>
            <li>ヴァイスシュヴァルツ、ゼクス、マジックザギャザリング、プレシャスメモリーズ、フューチャーカード、バディファイト、WIXOSS、ポケモンカードゲーム、デュエルマスターズ</li>
          </ul>
        </li>
      </ul>
      <Typography gutterBottom>
        {'参考: '}
        <Link href="https://www.sizekensaku.com/sonota/toreca.html" target="_blank" rel="noopener">
          トレーディングカードのサイズ!!【サイズ.com】
        </Link>
      </Typography>
    </section>
    <section css={sectionStyle}>
      <Title>プロキシカードの使用について</Title>
      <Typography gutterBottom>
        下記を守って使用してください。
      </Typography>
      <ul>
        <li>使用した画像の著作権や利用規約</li>
        <li>プロキシカード使用についてのルールやマナー</li>
      </ul>
      <Typography gutterBottom>
        印刷物および印刷データ(PDF)は、自由に使用していただいて構いませんが、当サービス利用でなんらかの損害が生じても、製作者は一切の責任を負いません。
      </Typography>
    </section>
    <section css={sectionStyle}>
      <Title>推奨環境</Title>
      <Typography gutterBottom>
        最新のモダンブラウザを使用してください。<br />
        推奨はデスクトップ版 Google Chrome です。Internet Explorer には対応しておりません。
      </Typography>
    </section>
    <section css={sectionStyle}>
      <Title>開発</Title>
      <Typography gutterBottom>
        GitHub にて、ソースコードを公開しています。issue やプルリクをお待ちしております。
      </Typography>
      <a href="https://github.com/iMasanari/proxy-card-print" target="_blank" rel="noopener">
        <img
          css={imageStyle}
          width="442"
          height="109"
          src="https://gh-card.dev/repos/iMasanari/proxy-card-print.svg"
          alt="iMasanari/proxy-card-print - GitHub"
        />
      </a>
    </section>
  </div>

export default Usage
