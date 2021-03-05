const mdx = require('@next/mdx')
const withImages = require('next-images')

const withMdx = mdx()

module.exports = withMdx(withImages({
  inlineImageLimit: false,
  webpack(config, {defaultLoaders}) {
    config.module.rules.push(
      {
        test: /\.worker\.ts$/,
        use: [
          { loader: 'worker-loader', options: { publicPath: '/_next/', filename: 'static/worker/worker.[hash].js' } },
          defaultLoaders.babel,
        ],
      },
      { test: /\.afm$/, use: 'raw-loader' },
      { test: /node_modules\/(fontkit|linebreak)/, use: 'null-loader' },
    )

    config.resolve.alias = {
      ...config.resolve.alias,
      fs: 'pdfkit/js/virtual-fs.js',
    }

    config.output.globalObject = 'self'

    return config
  },
}))
