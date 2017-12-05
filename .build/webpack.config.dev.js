// webpack.config.js for development

'use strict'

const path = require('path')
const webpack = require('webpack')
const getEnv = require('env-parse').getEnv
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { webpackBase } = require('./config')

const resolve = function (dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = webpackBase.extend({
  entry: {
    'demo.bundle': resolve('demo/main.js')
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader'] }
      , { test: /\.css$/, use: ['style-loader', 'css-loader'] }
      , { test: /\.vue$/, loader: 'vue-loader' }
    ]
  },
  devServer: {
    open: true,
    openPage: 'demo/',
    contentBase: resolve('.'),
    publicPath: '/demo',
    compress: true,
    port: getEnv('DEV_PORT', 9000),
    noInfo: false
  },
  devtool: '#cheap-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    })
    , new HtmlWebpackPlugin({
      inject: false,
      template: 'demo/index.html'
    })
  ]
})


