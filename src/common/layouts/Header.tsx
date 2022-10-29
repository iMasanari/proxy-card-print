import { css } from '@emotion/react'
import { Twitter } from '@mui/icons-material'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'

const titleStyle = css`
  margin-right: auto;
`

const Header = () =>
  <AppBar position="static">
    <Toolbar>
      <Typography component="h1" variant="h6" css={titleStyle}>
        プロキシカード印刷
      </Typography>
      <Button color="inherit" startIcon={<Twitter />} href="https://twitter.com/intent/tweet?text=プロキシカード印刷｜PCスマホで簡単作成、コンビニ印刷！%20%23プロキシ印刷%0A&url=https%3A%2F%2Fimasanari.github.io%2Fproxy-card-print%2F">
        Tweet
      </Button>
    </Toolbar>
  </AppBar>

export default Header
