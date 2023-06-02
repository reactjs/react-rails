// Common configuration applying to client and server configuration

const { webpackConfig: baseClientWebpackConfig, merge } = require('shakapacker')

const commonOptions = {
  resolve: {
      extensions: ['.css', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.mdx?$/,
        use: [
          {
            loader: '@mdx-js/loader',
          }
        ]
      }
    ]
  },
  // Uncommemt if getting "Module not found: Error: Can't resolve 'react-dom/client'" warning
  // ignoreWarnings: [/Module not found: Error: Can't resolve 'react-dom\/client'/]
}

// Copy the object using merge b/c the baseClientWebpackConfig and commonOptions are mutable globals
const commonWebpackConfig = () => (merge({}, baseClientWebpackConfig, commonOptions))

module.exports = commonWebpackConfig
