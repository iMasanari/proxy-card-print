import React from 'react'

require('./Usage.css')

const Usage = require('~/documents/Usage.mdx').default

export default () =>
  <div className="Usage">
    <Usage />
  </div>
