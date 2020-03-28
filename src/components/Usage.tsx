import React from 'react'

require('./Usage.css')

const md = require('~/documents/usage.md') as string

export default () =>
  <div className="Usage" dangerouslySetInnerHTML={{ __html: md }} />
