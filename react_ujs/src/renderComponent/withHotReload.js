var ReactDOM = require("react-dom")
var reactHotLoader = require("react-hot-loader")
var AppContainer = reactHotLoader.AppContainer;

// Render React component with hot reload.
//
// Ensure
// 1. [react-hot-loader](https://github.com/gaearon/react-hot-loader) and [@hot-loader/react-dom](https://github.com/hot-loader/react-dom) are installed;
// 2. your webpack config has the following in dev:
// {
//   module: {
//     rules: [
//       {
//         test: /\.(jsx|tsx)?$/,
//         use: ["react-hot-loader/webpack"],
//       },
//     ],
//   },
//   resolve: {
//     alias: {
//       "react-dom": "@hot-loader/react-dom",
//     },
//   },
// }
//
module.exports = function(reqctx) {
  return function(renderFunctionName, component, node, props) {
    var className = node.getAttribute(ReactRailsUJS.CLASS_NAME_ATTR);
    var filename = getFileNameFromClassName(className);
    var path = reqctx.resolve("./" + filename);
    var cache = require.cache;
    var module = cache[path];
    var moduleParent = module && cache[module.parents[0]];
    if (!moduleParent || !moduleParent.hot) {
      console.warn(`Cannot hot reload for ${path}. Ensure webpack-dev-server is started with --hot and WEBPACKER_DEV_SERVER_HMR=true`);
      return;
    }
    moduleParent.hot.accept(path, () => {
      var FreshConstructor = ReactRailsUJS.getConstructor(className);
      var FreshComponent = React.createElement(FreshConstructor, props);

      ReactDOM[renderFunctionName](React.createElement(AppContainer, null, FreshComponent), node);
    });

    ReactDOM[renderFunctionName](React.createElement(AppContainer, null, component), node);
  };
}

function getFileNameFromClassName(className) {
  var parts = className.split(".");
  var filename = parts.shift();

  return filename;
}
