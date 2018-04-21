/* eslint-env node */
'use strict'

const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const autoprefixer = require('autoprefixer')

module.exports = {
  mode: process.env.BUILD_MODE || 'development',
  context: __dirname,
  entry: {
    account: './js/apps/account/account.js',
    admin: './js/apps/admin/admin.js',
    breakdown: './js/apps/breakdown/breakdown.js',
    global: './js/apps/global/global.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].min.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      { parser: { amd: false } },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [/app\/scripts/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              sourceMaps: true,
              cacheDirectory: true,
              presets: [
                'es2015',
              ],
              plugins: [
                'babel-plugin-rewire',
              ],
            },
          },
          {
            loader: 'eslint-loader',
            options: {
              quiet: true,
              failOnError: true,
              emitError: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextWebpackPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                minimize: false,
                sourceMap: false,
              },
            },
            {
              loader: 'csso-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  autoprefixer({ browsers: [
                    'ff >= 55',
                    'safari >= 9',
                    'chrome >= 60',
                    'ie >= 10',
                  ]}),
                ],
              },
            },
          ],
        }),
      },
      // images
      {
        test: /\.(jpe?g|png|gif|svg)(\?\S*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              useRelativePath: false,
            },
          },
        ],
      },
      // fonts
      {
        test: /\.(otf|ttf|eot|woff(2)?)(\?\S*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './fonts/',
              useRelativePath: false,
            },
          },
        ],
      },
      {
        test: /\.xml$/,
        use: [
          {
            loader: 'raw-loader',
          },
        ],
      },
      {
        test: /\.html/,
        exclude: /index\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // Writes styles.css to disk.
    new ExtractTextWebpackPlugin('[name].css'),
    new webpack.ProvidePlugin({
      angular: 'angular',
    }),
  ],
  resolve: {
    modules: [
      path.join('./app'),
      // This significantly speeds up build times.
      path.join('./node_modules'),
    ],
  },
  // Webpack hosts the files here. Also serves as a reverse proxy to
  // localProxy/proxy.js.
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 9000,
    contentBase: path.join(__dirname, 'dist'),
    proxy: [],
  },
}
