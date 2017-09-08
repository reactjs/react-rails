// Note: You must restart bin/webpack-dev-server for changes to take effect

const merge = require('webpack-merge')
const devConfig = require('./development.js')
const { devServer, output } = require('./configuration.js')

module.exports = merge(devConfig, {
  devServer: {
    host: devServer.host,
    port: devServer.port,
    contentBase: output.path,
    publicPath: output.publicPath,
    compress: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true
  }
})
