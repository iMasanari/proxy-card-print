// @ts-check

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

/** @type import('webpack').Configuration */
module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'scripts/[name].[hash:7].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/bundle.[hash:7].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
      },
    }),
  ],
  module: {
    rules: [
      { test: /\.worker\.ts$/, loader: 'worker-loader', options: { name: 'scripts/worker.[hash:7].js' } },
      { test: /\.tsx?$/, use: [{ loader: 'ts-loader', options: { transpileOnly: true } }] },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      { test: /\.md$/, use: ['html-loader', 'markdown-loader'] },
      { test: /\.afm$/, use: 'raw-loader' },
      { test: /node_modules\/(fontkit|linebreak)/, use: 'null-loader' },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin(),
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '~': path.resolve(__dirname, 'src'),
      fs: 'pdfkit/js/virtual-fs.js',
    },
  },
  stats: { children: false },
}
