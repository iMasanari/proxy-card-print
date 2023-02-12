import { css } from '@emotion/react'
import TranslateIcon from '@mui/icons-material/Translate'
import { AppBar, createTheme, InputAdornment, MenuItem, TextField, ThemeProvider, Toolbar, Typography } from '@mui/material'
import { ChangeEvent, useId } from 'react'
import { useTranslation } from 'react-i18next'

const titleStyle = css`
  margin-right: auto;
`

const langSelectStyle = css`
  & svg {
    color: currentColor;
  }
`

const langSelectTheme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    text: {
      primary: 'currentColor',
      secondary: 'currentColor',
    },
  },
})

const Header = () => {
  const { t, i18n } = useTranslation()
  const labelId = useId()

  const onSelectLang = (e: ChangeEvent<HTMLInputElement>) => {
    const lang = e.target.value
    const path = lang === 'ja' ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}${lang.toLowerCase()}/`

    history.pushState({ lang }, '', path)
    window.dispatchEvent(new PopStateEvent('popstate', { state: { lang } }))
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography component="h1" variant="h6" css={titleStyle}>
          {t('Header.title', 'プロキシカード印刷')}
        </Typography>
        <ThemeProvider theme={langSelectTheme}>
          <TextField
            id={labelId}
            select
            size="small"
            value={i18n.language}
            onChange={onSelectLang}
            css={langSelectStyle}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ color: 'currentColor' }}>
                  <TranslateIcon />
                </InputAdornment>
              ),
            }}
            aria-label={t('Header.language', '言語選択')!}
          >
            <MenuItem value="ja" lang="ja">日本語</MenuItem>
            <MenuItem value="en" lang="en">English</MenuItem>
            <MenuItem value="zh-Hans" lang="zh-Hans">简体中文</MenuItem>
          </TextField>
        </ThemeProvider>
      </Toolbar>
    </AppBar>
  )
}
export default Header
