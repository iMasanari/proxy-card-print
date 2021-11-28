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

const UsageDocument = require('./UsageDocument.mdx').default

const Usage = () =>
  <div css={usageStyle}>
    <UsageDocument />
  </div>

export default Usage
