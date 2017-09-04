"use strict";

const path = require("path");
const webpack = require("webpack");
const getEnv = require("env-parse").getEnv;

const resolve = function(dir) {
  return path.resolve(__dirname, "..", dir);
};

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: resolve("demo/main.js"),
  output: {
    path: resolve("demo"),
    filename: "main.js"
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: "vue-loader" },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "resolve-url-loader", "sass-loader"]
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
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
  devServer: {
    open: true,
    contentBase: resolve("."),
    compress: true,
    port: getEnv("DEV_PORT", 9000),
    noInfo: true
  },
  devtool: "#source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"development"'
      }
    }),
    new HtmlWebpackPlugin({
      template: "demo/index.html"
    })
  ]
};
