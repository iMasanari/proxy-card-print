const mdx = require('@next/mdx')

const withMdx = mdx()

module.exports = withMdx({
  basePath: process.env.BASE_PATH,
  trailingSlash: true,
  webpack(config) {
    config.module.rules.push(
      { test: /\.afm$/, use: 'raw-loader' },
      { test: /node_modules\/(fontkit|linebreak)/, use: 'null-loader' },
    )

    config.resolve.alias = {
      ...config.resolve.alias,
      fs: 'pdfkit/js/virtual-fs.js',
    }

    config.resolve.fallback= {
      stream: require.resolve('stream-browserify'),
      zlib: require.resolve('browserify-zlib'),
      util: require.resolve('util/'),
      assert: require.resolve('assert/'),
    }

    return config
  },
})
