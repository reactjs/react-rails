// Use `rake react:update` to build this bundle & copy files into the gem.
var webpack = require("webpack");

var reactRailsEnv = process.env.NODE_ENV == "production" ? "production" : "development";

var plugins = [];

if (reactRailsEnv == "production") {
  var definePlugin = new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'});
  var minifyPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    }
  });
  plugins.push(definePlugin);
  plugins.push(minifyPlugin);
}


module.exports = {
  context: __dirname,
  entry: {
    "react-browser": "./react-browser.js",
    "react-browser-with-addons": "./react-browser-with-addons.js",
    "react-server": "./react-server.js",
    "react-server-with-addons": "./react-server-with-addons.js",
    "react-addons-create-fragment": "./addons-create-fragment.js",
    "react-addons-css-transition-group": "./addons-css-transition-group.js",
    "react-addons-linked-state-mixin": "./addons-linked-state-mixin.js",
    "react-addons-perf": "./addons-perf.js",
    "react-addons-pure-render-mixin": "./addons-pure-render-mixin.js",
    "react-addons-test-utils": "./addons-test-utils.js",
    "react-addons-transition-group": "./addons-transition-group.js",
    "react-addons-update": "./addons-update.js",
  },
  output: {
      path: __dirname + "/build/" + reactRailsEnv,
      filename: "[name].js",
  },
  plugins: plugins,
};
