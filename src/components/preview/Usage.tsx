import { css } from '@emotion/react'
import React from 'react'

const usageStyle = css`
  overflow-y: auto;
  flex: 1;
  padding: 0 0.5rem;
  & img {
    max-width: 100%;
  }
`

const Usage = require('~/documents/Usage.mdx').default

export default () =>
  <div css={usageStyle}>
    <Usage />
  </div>
