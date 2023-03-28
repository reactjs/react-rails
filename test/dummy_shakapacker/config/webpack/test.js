const webpackConfig = require('./ServerClientOrBoth')

const testOnly = (_clientWebpackConfig, _serverWebpackConfig) => {
  // place any code here that is for test only
}

module.exports = webpackConfig(testOnly)
