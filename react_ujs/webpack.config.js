module.exports = {
  context: __dirname,
  entry: "./index.js",
  output: {
    path: __dirname + "/dist/",
    filename: "react_ujs.js",
    library: "ReactRailsUJS",
    libraryTarget: 'umd'
  },
  externals: {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    },
    'react-dom/client': {
      root: 'ReactDOMClient',
      commonjs2: 'react-dom/client',
      commonjs: 'react-dom/client',
      amd: 'react-dom/client'
    },
    'react-dom/server': {
      root: 'ReactDOMServer',
      commonjs2: 'react-dom/server',
      commonjs: 'react-dom/server',
      amd: 'react-dom/server'
    }
  }
};
