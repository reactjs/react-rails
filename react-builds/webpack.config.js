// Use `rake react:update` to build this bundle & copy files into the gem.
var webpack = require("webpack");

var reactRailsEnv = process.env.NODE_ENV == "production" ? "production" : "development";

var envPlugin = new webpack.DefinePlugin({
    NODE_ENV: reactRailsEnv,
})

module.exports = {
  context: __dirname,
  entry: {
    "react-browser": "./react-browser.js",
    "react-browser-with-addons": "./react-browser-with-addons.js",
    "react-server": "./react-server.js",
    "react-server-with-addons": "./react-server-with-addons.js",
  },
  output: {
      path: __dirname + "/build/" + reactRailsEnv,
      filename: "[name].js",
  },
  plugins: [
    envPlugin
  ],
};
