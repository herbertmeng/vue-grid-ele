/**
 * Configs module for project builder extends
 *
 * MIT Licensed
 *
 * Authors:
 *   Allex Wang <allex.wxn@gmail.com> (http://iallex.com/)
 */

'use strict'

const path = require('path')
const merge = require('webpack-merge')
const ProgressPlugin = require('@fedor/progress-webpack-plugin')
const pkg = require('../package.json')

const resolve = function(dir) {
  return path.resolve(__dirname, '..', dir)
}

function $external (module, root) {
  if (typeof module === 'string') {
    return {
      var: root,
      root: root,
      commonjs: module,
      commonjs2: module,
      amd: module
    }
  }
  return Object.keys(module).reduce((o, k) => {
    o[k] = $external(k, module[k])
    return o
  }, {})
}

// Normalize fss configrations
const fssConfig = pkg.fss
if (fssConfig) {
  if (!fssConfig.publicPath) {
    let cdnPrefix = fssConfig.cdnPrefix
    if (!cdnPrefix) {
      throw new Error('FSS cdn prefix not found.')
    }
    cdnPrefix = cdnPrefix.replace(/\/+$/, '')
    fssConfig.publicPath = `${cdnPrefix}/${pkg.name}@${pkg.version}`
  }
}

const webpackBase = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [ {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            cacheIdentifier: true
          }
        } ]
      }
      , {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'font/[name].[hash:7].[ext]'
        }
      }
      , {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          publicPath: (fssConfig && fssConfig.publicPath || '') + '/dist/',
          name: 'images/[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      '@': resolve('src'),
      'src': resolve('src'),
      'vue': 'vue/dist/vue.esm.js'
    },
    extensions: [".js", ".json", ".vue", ".jsx"]
  },
  plugins: [
    new ProgressPlugin()
  ],
  externals: $external({
    'jquery': '$',
    'jquery-mousewheel': '$',
    'react': 'React',
    'vue': 'Vue',
    'lodash': '_',
    '@vue/utils': 'VueUtils',
    '@fedor/v-utils': '___'
  }),
  devtool: false,
  performance: {
    hints: 'warning'
  }
}

// make webpack config extendable.
;(function extendable (o) {
  Object.defineProperty(o, 'extend', {
    writable: false,
    configurable: false,
    enumerable: false,
    value: function (o) {
      o = merge.smart({}, webpackBase, o)
      extendable(o)
      return o
    }
  })
}(webpackBase))

module.exports = {
  fssConfig,
  webpackBase
}

// vim: set ft=javascript fdm=marker et ff=unix tw=80 sw=2:
