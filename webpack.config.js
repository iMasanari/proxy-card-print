// @ts-check

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const PrerenderSPAPlugin = require('prerender-spa-plugin')

/** @type import('webpack').Configuration */
module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: '[name].[hash:7].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new HTMLInlineCSSWebpackPlugin(),
    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist'),
      routes: ['/'],
    })
  ],
  module: {
    rules: [
      { test: /\.worker\.ts$/, use: [{ loader: 'worker-loader', options: { name: 'worker.[hash:7].js' } }] },
      { test: /\.tsx?$/, use: [{ loader: 'ts-loader', options: { transpileOnly: true } }] },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      { test: /\.(png|jpe?g|gif)$/, use: [{ loader: 'file-loader', options: { name: '[name].[contenthash:7].[ext]' } }] },
      { test: /\.mdx?$/, use: ['babel-loader', '@mdx-js/loader'] },
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
