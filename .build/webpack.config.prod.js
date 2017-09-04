"use strict";

const path = require("path");
const webpack = require("webpack");

const resolve = function(dir) {
  return path.resolve(__dirname, "..", dir);
};

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const genVueLoadOptions = function(option) {
  // vue load config goes here
  const config = {};
  if (!option.bundle) {
    config.extractCSS = true;
  }
  return config;
};

const genInnerCssLoader = function(option) {
  const cssLoader = {
    loader: "css-loader"
  };
  if (option.compress) {
    cssLoader.options = { minimize: true };
  }
  return cssLoader;
};

const genCssLoader = function(option) {
  const cssLoader = genInnerCssLoader(option);
  let config = ["style-loader", cssLoader];
  if (!option.bundle) {
    config = ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: cssLoader,
      publicPath: "./"
    });
  }
  return config;
};

const genSassLoader = function(option) {
  const cssLoader = genInnerCssLoader(option);
  let config = ["style-loader", cssLoader, "resolve-url-loader", "sass-loader"];
  if (!option.bundle) {
    config = ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: [cssLoader, "resolve-url-loader", "sass-loader"],
      publicPath: "./"
    });
  }
  return config;
};

const genWebpackCfg = function genWebpackCfg(fileName, libName, option) {
  const config = {
    entry: resolve("src/index.js"),
    output: {
      path: resolve("dist"),
      publicPath: "/dist/",
      filename: `${fileName}.js`,
      library: `${libName}`,
      libraryTarget: "umd",
      umdNamedDefine: true,
      libraryExport: "default"
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
          options: genVueLoadOptions(option)
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel-loader"
        },
        {
          test: /\.scss$/,
          use: genCssLoader(option)
        },
        {
          test: /\.css$/,
          use: genSassLoader(option)
        },
        {
          test: /\.(gif|jpg|png|woff(2)?|svg|eot|ttf)$/,
          loader: "file-loader",
          options: {
            publicPath: "./",
            name: "[name].[ext]?[hash]"
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.vue']
    },
    externals: {
      lodash: {
        commonjs2: "lodash",
        commonjs: "lodash",
        amd: "lodash",
        root: "_"
      },
      vue: {
        commonjs2: "vue",
        commonjs: "vue",
        amd: "vue",
        root: "Vue"
      }
    },
    devtool: "source-map",
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: '"production"'
        }
      })
    ]
  };

  if (!option.bundle) {
    config.plugins.push(new ExtractTextPlugin(`${fileName}.css`));
  }

  if (option.compress) {
    config.plugins.push(
      new UglifyJSPlugin({ parallel: true, sourceMap: true })
    );
  }

  return config;
};

const fileName = "v-table";
const libName = "vTable";

const createOutputList = function(fileName, libName) {
  const lib = [
    fileName,
    libName,
    {
      bundle: false,
      compress: false
    }
  ];
  const minLib = [
    `${fileName}.min`,
    libName,
    {
      bundle: false,
      compress: true
    }
  ];
  const bundleLib = [
    `${fileName}.bundle`,
    libName,
    {
      bundle: true,
      compress: true
    }
  ];
  return [lib, minLib, bundleLib];
};

const webpackConfig = createOutputList(fileName, libName).map(function(output) {
  return genWebpackCfg.apply(null, output);
});

module.exports = webpackConfig;
