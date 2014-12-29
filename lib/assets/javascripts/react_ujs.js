// Unobtrusive scripting adapter for React
(function(document, window, React) {
  var CLASS_NAME_ATTR = 'data-react-class';
  var PROPS_ATTR = 'data-react-props';

  // jQuery is optional. Use it to support legacy browsers.
  var $ = (typeof jQuery !== 'undefined') && jQuery;

  var findReactDOMNodes = function(rootNode) {
    var SELECTOR = '[' + CLASS_NAME_ATTR + ']';
    if ($) {
      if (typeof rootNode !== 'undefined') {
        return $(rootNode).find(SELECTOR);
      } else {
        return $(SELECTOR);
      }
    } else {
      return (rootNode || document).querySelectorAll(SELECTOR);
    }
  };

  var mountReactComponents = function(rootNode) {
    var nodes = findReactDOMNodes(rootNode);
    for (var i = 0; i < nodes.length; ++i) {
      var node = nodes[i];
      var className = node.getAttribute(CLASS_NAME_ATTR);
      // Assume className is simple and can be found at top-level (window).
      // Fallback to eval to handle cases like 'My.React.ComponentName'.
      var constructor = window[className] || eval.call(window, className);
      var propsJson = node.getAttribute(PROPS_ATTR);
      var props = propsJson && JSON.parse(propsJson);
      React.render(React.createElement(constructor, props), node);
    }
  };

  var unmountReactComponents = function(rootNode) {
    var nodes = findReactDOMNodes(rootNode);
    for (var i = 0; i < nodes.length; ++i) {
      React.unmountComponentAtNode(nodes[i]);
    }
  };

  var handleTurbolinksEvents = function() {
    var handleEvent;
    if ($) {
      handleEvent = function(eventName, callback) {
        $(document).on(eventName, callback);
      }
    } else {
      handleEvent = function(eventName, callback) {
        document.addEventListener(eventName, callback);
      }
    }
    handleEvent('page:change', function() {mountReactComponents()});
    handleEvent('page:receive', function() {unmountReactComponents()});
  };

  var handleNativeEvents = function() {
    if ($) {
      $(function() {mountReactComponents()});
      $(window).unload(function() {unmountReactComponents()});
    } else {
      document.addEventListener(
        'DOMContentLoaded', function() {mountReactComponents()});
      window.addEventListener(
        'unload', function() {unmountReactComponents()});
    }
  };

  typeof Turbolinks !== 'undefined' ? handleTurbolinksEvents() : handleNativeEvents();

  window.ReactUJS = {
    mountReactComponents: mountReactComponents,
    unmountReactComponents: unmountReactComponents
  };
})(document, window, React);
