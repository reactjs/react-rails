try {
  const environment = require('./environment')

  module.exports = environment.toWebpackConfig()
} catch (e) {
  const merge = require('webpack-merge')
  const sharedConfig = require('./shared.js')

  module.exports = merge(sharedConfig, {
    devtool: 'sourcemap',

    stats: {
      errorDetails: true
    },

    output: {
      pathinfo: true
    }
  })
}