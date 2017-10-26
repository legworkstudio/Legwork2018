const path = require('path')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const ModernizrWebpackPlugin = require("modernizr-webpack-plugin")
const modernizr_config = require("modernizr/lib/config-all.json")
const Dotenv = require('dotenv-webpack')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  devtool: isProd
    ? false
    : '#cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      'public': path.resolve(__dirname, '../public'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
        query: {
          configFile: "./.eslintrc.js",
          fix: true
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        use: isProd
          ? ExtractTextPlugin.extract({
              use: 'css-loader?minimize',
              fallback: 'vue-style-loader'
            })
          : ['vue-style-loader', 'sass-loader', 'css-loader']
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: isProd
    ? [
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false }
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({
          filename: 'common.[chunkhash].css'
        }),
        new webpack.ProvidePlugin({
          "window.jQuery"    : "jquery",
          "window.$"         : "jquery",
          "jQuery"           : "jquery",
          "$"                : "jquery",
          "_"                : "lodash"
        }),
        new ModernizrWebpackPlugin(modernizr_config),
        new Dotenv({
          path: '.env', // Path to .env file (this is the default) 
          safe: false // load .env.example (defaults to "false" which does not use dotenv-safe) 
        })
      ]
    : [
        new FriendlyErrorsPlugin(),
        new webpack.ProvidePlugin({
          "window.jQuery"    : "jquery",
          "window.$"         : "jquery",
          "jQuery"           : "jquery",
          "$"                : "jquery",
          "_"                : "lodash"
        }),
        new ModernizrWebpackPlugin(modernizr_config),
        new Dotenv({
          path: '.env', // Path to .env file (this is the default) 
          safe: false // load .env.example (defaults to "false" which does not use dotenv-safe) 
        })
      ]
}
