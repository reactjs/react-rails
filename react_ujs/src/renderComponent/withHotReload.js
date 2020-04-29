var ReactDOM = require("react-dom")
var reactHotLoader = require("react-hot-loader")
var AppContainer = reactHotLoader.AppContainer;

// Render React component with hot reload.
//
// See the HMR section in README to ensure required steps are completed.
module.exports = function(webpackRequireContext) {
  return function(renderFunctionName, component, node, props) {
    var className = node.getAttribute(ReactRailsUJS.CLASS_NAME_ATTR);
    var filename = getFileNameFromClassName(className);
    var path = webpackRequireContext.resolve("./" + filename);
    var cache = require.cache;
    var module = cache[path];
    var moduleParent = module && cache[module.parents[0]];
    if (!moduleParent || !moduleParent.hot) {
      console.warn(`Cannot hot reload for ${path}. Ensure webpack-dev-server is started with --hot and WEBPACKER_DEV_SERVER_HMR=true`);
      return;
    }
    moduleParent.hot.accept(path, () => reRenderAllNodes(className, renderFunctionName));

    ReactDOM[renderFunctionName](React.createElement(AppContainer, null, component), node);
  };
}

function getFileNameFromClassName(className) {
  var parts = className.split(".");
  var filename = parts.shift();

  return filename;
}

function reRenderAllNodes(className, renderFunctionName) {
  var nodes = findAllReactNodes(className);
  for (var i = 0; i < nodes.length; ++i) {
    var node = nodes[i];
    if (!isReactMountedAtNode(node)) continue;
    
    var propsJson = node.getAttribute(ujs.PROPS_ATTR);
    var props = propsJson && JSON.parse(propsJson);
    var FreshComponent = React.createElement(FreshConstructor, props);
    ReactDOM[renderFunctionName](React.createElement(AppContainer, null, FreshComponent), node);
  }
}

function findAllReactNodes(className) {
  var selector = '[' + ReactRailsUJS.CLASS_NAME_ATTR + '="' + className + '"]';
  if (ReactRailsUJS.jQuery) {
    return ReactRailsUJS.jQuery(selector, document);
  } else {
    return parent.querySelectorAll(selector);
  }
}

function isReactMountedAtNode(node) {
  return node.hasChildNodes();
}
