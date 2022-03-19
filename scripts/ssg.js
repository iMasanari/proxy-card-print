// @ts-check

const fs = require('fs')
// @ts-ignore
const { render } = require('../generated/ssg/entry-ssg')

const template = fs.readFileSync('dist/index.html', 'utf-8')

const app = render()
const html = template
  .replace('<!--app-html-->', app.html)
  .replace('</head>', `${app.styles}\n</head>`)

fs.writeFileSync('dist/index.html', html)
