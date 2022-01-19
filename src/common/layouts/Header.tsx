import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'

const Header = () =>
  <AppBar position="static">
    <Toolbar>
      <Typography component="h1" variant="h6">
        プロキシカード印刷
      </Typography>
    </Toolbar>
  </AppBar>

export default Header
