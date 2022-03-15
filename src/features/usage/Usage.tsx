import { css, Theme } from '@emotion/react'
import AddPhotoAlternate from '@mui/icons-material/AddPhotoAlternate'
import ContentCut from '@mui/icons-material/ContentCut'
import Print from '@mui/icons-material/Print'
import { Box, Card, Grid, Link, Typography, TypographyProps } from '@mui/material'
import React from 'react'
// @ts-expect-error
import UsageDocument from './UsageDocument.mdx'

const usageStyle = css`
  overflow-y: auto;
  flex: 1;
  padding: 0 0.5rem;
  & img {
    max-width: 100%;
  }
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
        また、印刷用データ(PDF)のダウンロードができるので、家にプリンタがなくても
        <Link href="https://www.printing.ne.jp/support/lite/index.html" target="_blank" rel="noopener">
          かんたん netprint
        </Link>
        等を利用して作成できます。
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
    <UsageDocument />
  </div>

export default Usage
