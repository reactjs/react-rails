;(function(document, window) {
  // jQuery is optional. Use it to support legacy browsers.
  var $ = (typeof window.jQuery !== 'undefined') && window.jQuery;

  window.ReactRailsUJS = {
    // This attribute holds the name of component which should be mounted
    // example: `data-react-class="MyApp.Items.EditForm"`
    CLASS_NAME_ATTR: 'data-react-class',

    // This attribute holds JSON stringified props for initializing the component
    // example: `data-react-props="{\"item\": { \"id\": 1, \"name\": \"My Item\"} }"`
    PROPS_ATTR: 'data-react-props',

    // helper method for the mount and unmount methods to find the
    // `data-react-class` DOM elements
    findDOMNodes: function(searchSelector) {
      // we will use fully qualified paths as we do not bind the callbacks
      var selector, parent;

      switch (typeof searchSelector) {
        case 'undefined':
          selector = '[' + window.ReactRailsUJS.CLASS_NAME_ATTR + ']';
          parent = document;
          break;
        case 'object':
          selector = '[' + window.ReactRailsUJS.CLASS_NAME_ATTR + ']';
          parent = searchSelector;
          break;
        case 'string':
          selector = searchSelector + '[' + window.ReactRailsUJS.CLASS_NAME_ATTR + '], ' +
                     searchSelector + ' [' + window.ReactRailsUJS.CLASS_NAME_ATTR + ']';
          parent = document;
          break
        default:
          break;
      }

      if ($) {
        return $(selector, parent);
      } else {
        return parent.querySelectorAll(selector);
      }
    },

    // Get the constructor for a className
    getConstructor: function(className) {
      // Assume className is simple and can be found at top-level (window).
      // Fallback to eval to handle cases like 'My.React.ComponentName'.
      // Also, try to gracefully import Babel 6 style default exports
      //
      var constructor;

      // Try to access the class globally first
      constructor = window[className];

      // If that didn't work, try eval
      if (!constructor) {
        constructor = eval.call(window, className);
      }

      // Lastly, if there is a default attribute try that
      if (constructor && constructor.default) {
        constructor = constructor.default;
      }

      return constructor;
    },

    // Within `searchSelector`, find nodes which should have React components
    // inside them, and mount them with their props.
    mountComponents: function(searchSelector) {
      var nodes = window.ReactRailsUJS.findDOMNodes(searchSelector);

      for (var i = 0; i < nodes.length; ++i) {
        var node = nodes[i];
        var className = node.getAttribute(window.ReactRailsUJS.CLASS_NAME_ATTR);
        var constructor = this.getConstructor(className);
        var propsJson = node.getAttribute(window.ReactRailsUJS.PROPS_ATTR);
        var props = propsJson && JSON.parse(propsJson);

        if (typeof(constructor) === "undefined") {
          var message = "Cannot find component: '" + className + "'"
          if (console && console.log) { console.log("%c[react-rails] %c" + message + " for element", "font-weight: bold", "", node) }
          var error = new Error(message + ". Make sure your component is globally available to render.")
          throw error
        } else {
          ReactDOM.render(React.createElement(constructor, props), node);
        }
      }
    },

    // Within `searchSelector`, find nodes which have React components
    // inside them, and unmount those components.
    unmountComponents: function(searchSelector) {
      var nodes = window.ReactRailsUJS.findDOMNodes(searchSelector);

      for (var i = 0; i < nodes.length; ++i) {
        var node = nodes[i];

        ReactDOM.unmountComponentAtNode(node);
      }
    }
  };
})(document, window);
