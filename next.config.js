const mdx = require('@next/mdx')

const withMdx = mdx()

module.exports = withMdx({
  basePath: process.env.BASE_PATH,
  trailingSlash: true,
  webpack(config) {
    // for jspdf.js
    config.resolve.alias = {
      ...config.resolve.alias,
      canvg: false,
      html2canvas: false,
      dompurify: false,
    }

    return config
  },
})
