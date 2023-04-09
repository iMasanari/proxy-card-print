import { css } from '@emotion/react'
import TranslateIcon from '@mui/icons-material/Translate'
import { AppBar, Button, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { useId, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

const titleStyle = css`
  margin-right: auto;
`

const Header = () => {
  const { t, i18n } = useTranslation()
  const menuId = useId()
  const anchorRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleMenuOpen = () => {
    setIsOpen(true)
  }

  const handleMenuClose = () => {
    setIsOpen(false)
  }

  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.currentTarget.hreflang === i18n.language && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
      e.preventDefault()
      setIsOpen(false)
    }
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography component="h1" variant="h6" css={titleStyle}>
          {t('Header.title', 'プロキシカード印刷')}
        </Typography>
        <Button
          ref={anchorRef}
          color="inherit"
          variant="outlined"
          aria-controls={menuId}
          aria-haspopup="true"
          aria-expanded={isOpen ? 'true' : 'false'}
          onClick={handleMenuOpen}
          startIcon={<TranslateIcon />}
          aria-label={t('Header.language', '言語選択')!}
        >
          {t('Header.currentLanguage', '日本語')}
        </Button>
      </Toolbar>
      <Menu
        anchorEl={anchorRef.current}
        id={menuId}
        keepMounted
        open={isOpen}
        onClose={handleMenuClose}
      >
        <li>
          <MenuItem component="a" href="/" lang="ja" hrefLang="ja" onClick={handleMenuClick}>
            日本語
          </MenuItem>
        </li>
        <li>
          <MenuItem component="a" href="/en/" lang="en" hrefLang="en" onClick={handleMenuClick}>
            English
          </MenuItem>
        </li>
        <li>
          <MenuItem component="a" href="/zh-Hans/" lang="zh-Hans" hrefLang="zh-Hans" onClick={handleMenuClick}>
            简体中文
          </MenuItem>
        </li>
      </Menu>
    </AppBar>
  )
}

export default Header
