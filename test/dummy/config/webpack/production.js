// Below code should get refactored but the current way that rails/webpacker v5
// does the globals, it's tricky
const webpackConfig = require('./ServerClientOrBoth')

const productionEnvOnly = (_clientWebpackConfig, _serverWebpackConfig) => {
  // place any code here that is for production only
}

module.exports = webpackConfig(productionEnvOnly)
