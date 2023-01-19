import { css } from '@emotion/react'
import { Twitter } from '@mui/icons-material'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const titleStyle = css`
  margin-right: auto;
`

const Header = () => {
  const { t } = useTranslation()

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography component="h1" variant="h6" css={titleStyle}>
          {t('Header.title', 'プロキシカード印刷')}
        </Typography>
        <Button color="inherit" startIcon={<Twitter />} href="https://twitter.com/intent/tweet?text=プロキシカード印刷｜PCスマホで簡単作成、コンビニ印刷！%20%23プロキシ印刷%0A&url=https%3A%2F%2Fimasanari.github.io%2Fproxy-card-print%2F">
          {t('Header.tweet', 'Tweet')}
        </Button>
      </Toolbar>
    </AppBar>
  )
}
export default Header
