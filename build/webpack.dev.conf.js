var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env,
      // firebase prod config
      "_FIREBASE_DB_": JSON.stringify("https://beerboard-staging.firebaseio.com"),
      "_FIREBASE_API_KEY_": JSON.stringify("AIzaSyCWjrEqzNL_ndOFiKif2cFQws_yYCYcBx8"),
      "_FIREBASE_AUTH_": JSON.stringify("beerboard-staging.firebaseapp.com"),
      "_FIREBASE_PROJECT_ID_": JSON.stringify("beerboard-staging"),
      "_FIREBASE_STORAGE_": JSON.stringify("beerboard-staging.appspot.com"),
      "_FIREBASE_MESSAGE_ID_": JSON.stringify("142269005793")
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
