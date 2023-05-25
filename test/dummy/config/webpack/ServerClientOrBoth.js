const clientWebpackConfig = require('./clientWebpackConfig')
const serverWebpackConfig = require('./serverWebpackConfig')

const webpackConfig = (envSpecific) => {
  const clientConfig = clientWebpackConfig()
  const serverConfig = serverWebpackConfig()

  if (envSpecific) {
    envSpecific(clientConfig, serverConfig)
  }

  let result
  // For HMR, need to separate the the client and server webpack configurations
  if (process.env.WEBPACK_SERVE || process.env.CLIENT_BUNDLE_ONLY) {
    // eslint-disable-next-line no-console
    console.log('[React on Rails] Creating only the client bundles.')
    result = clientConfig
  } else if (process.env.SERVER_BUNDLE_ONLY) {
    // eslint-disable-next-line no-console
    console.log('[React on Rails] Creating only the server bundle.')
    result = serverConfig
  } else {
    // default is the standard client and server build
    // eslint-disable-next-line no-console
    console.log('[React on Rails] Creating both client and server bundles.')
    result = [clientConfig, serverConfig]
  }

  // To debug, uncomment next line and inspect "result"
  // debugger
  return result
}

module.exports = webpackConfig
