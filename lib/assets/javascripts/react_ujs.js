// Unobtrusive scripting adapter for React
(function(document, window, React) {
  var CLASS_NAME_ATTR = 'data-react-class';
  var PROPS_ATTR = 'data-react-props';

  // jQuery is optional. Use it to support legacy browsers.
  var $ = (typeof jQuery !== 'undefined') && jQuery;

  var findReactDOMNodes = function() {
    var SELECTOR = '[' + CLASS_NAME_ATTR + ']';
    if ($) {
      return $(SELECTOR);
    } else {
      return document.querySelectorAll(SELECTOR);
    }
  };

  var mountReactComponents = function() {
    var nodes = findReactDOMNodes();
    for (var i = 0; i < nodes.length; ++i) {
      var node = nodes[i];
      var className = node.getAttribute(CLASS_NAME_ATTR);
      // Assume className is simple and can be found at top-level (window).
      // Fallback to eval to handle cases like 'My.React.ComponentName'.
      var constructor = window[className] || eval.call(window, className);
      var propsJson = node.getAttribute(PROPS_ATTR);
      var props = propsJson && JSON.parse(propsJson);
      React.renderComponent(constructor(props), node);
    }
  };

  var unmountReactComponents = function() {
    var nodes = findReactDOMNodes();
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
    handleEvent('page:change', mountReactComponents);
    handleEvent('page:receive', unmountReactComponents);
  };

  var handleNativeEvents = function() {
    if ($) {
      $(mountReactComponents);
      $(window).unload(unmountReactComponents);
    } else {
      document.addEventListener('DOMContentLoaded', mountReactComponents);
      window.addEventListener('unload', unmountReactComponents);
    }
  };

  typeof Turbolinks !== 'undefined' ? handleTurbolinksEvents() : handleNativeEvents();
})(document, window, React);
