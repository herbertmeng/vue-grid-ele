'use strict'

const path = require('path')
const merge = require('webpack-merge')
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
          publicPath: '/dist/',
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
  plugins: [],
  externals: Object.assign($external({
    'jquery': '$',
    'vue': 'Vue',
    'lodash': '_',
    '@vue/utils':'VueUtils'
  }),{
    'nicescroll':true
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
  webpackBase
}

