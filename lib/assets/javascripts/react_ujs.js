// Unobtrusive scripting adapter for React
(function(document, window) {
  // jQuery is optional. Use it to support legacy browsers.
  var $ = (typeof window.jQuery !== 'undefined') && window.jQuery;
  
  // create the  namespace
  window.ReactRailsUJS = {
    
    CLASS_NAME_ATTR: 'data-react-class',
    
    PROPS_ATTR: 'data-react-props',
    
    // helper method for the mount and unmount methods to find the 
    // `data-react-class` DOM elements
    findDOMNodes: function() {
      
      // we will use fully qualified paths as we do not bind the callbacks   
      var selector = '[' + window.ReactRailsUJS.CLASS_NAME_ATTR + ']';
      
      if ($) return $(selector);
      
      else return document.querySelectorAll(selector);
    },
    
    mountComponents: function() {
      var nodes = ReactRailsUJS.findDOMNodes();
      
      for (var i = 0; i < nodes.length; ++i) {
        var node = nodes[i];
        var className = node.getAttribute(window.ReactRailsUJS.CLASS_NAME_ATTR);
        
        // Assume className is simple and can be found at top-level (window).
        // Fallback to eval to handle cases like 'My.React.ComponentName'.
        var constructor = window[className] || eval.call(window, className);
        var propsJson = node.getAttribute(window.ReactRailsUJS.PROPS_ATTR);
        var props = propsJson && JSON.parse(propsJson);
        
        React.render(React.createElement(constructor, props), node);
      }
    },
    
    unmountComponents: function() {
      var nodes = window.ReactRailsUJS.findDOMNodes();
      
      for (var i = 0; i < nodes.length; ++i) {
        var node = nodes[i];
        
        React.unmountComponentAtNode(node);
        // now remove the `data-react-class` wrapper as well
        node.parentElement && node.parentElement.removeChild(node);
      }
    }
  };

  // functions not exposed publicly
  function handleTurbolinksEvents () {
    var handleEvent;
    
    if ($) {
      
      handleEvent = function(eventName, callback) {
        $(document).on(eventName, callback);
      };
      
    } else {
      
      handleEvent = function(eventName, callback) {
        document.addEventListener(eventName, callback);
      };
      
    }
    handleEvent('page:change', window.ReactRailsUJS.mountComponents);
    handleEvent('page:receive', window.ReactRailsUJS.unmountComponents);
  }

  function handleNativeEvents() {
    if ($) {
      
      $(window.ReactRailsUJS.mountComponents);
      $(window).unload(window.ReactRailsUJS.unmountComponents);
      
    } else {
      
      document.addEventListener('DOMContentLoaded', window.ReactRailsUJS.mountComponents);
      window.addEventListener('unload', window.ReactRailsUJS.unmountComponents);
    }
  }

  if (typeof Turbolinks !== 'undefined' && Turbolinks.supported) {
    handleTurbolinksEvents();
  } else {
    handleNativeEvents();
  }
})(document, window);
