// Unobtrusive scripting adapter for React
(function(document, window, React) {
  
  // jQuery is optional. Use it to support legacy browsers.
  var $ = (typeof window.jQuery !== 'undefined') && window.jQuery;
  
  // rather than create another namespace just for the 3 methods and 2
  // properties we expose just append them to the `React.ujs` object
  React.ujs = {
    
    CLASS_NAME_ATTR: 'data-react-class',
    
    PROPS_ATTR: 'data-react-props',
    
    // helper method for the mount and unmount methods to find the 
    // `data-react-class` DOM elements
    findDOMNodes: function() {
      
      // we will use fully qualified paths as we do not bind the callbacks   
      var selector = '[' + React.ujs.CLASS_NAME_ATTR + ']';
      
      if ($) return $(selector);
      
      else return document.querySelectorAll(selector);
    },
    
    mountComponents: function() {
      var nodes = React.ujs.findDOMNodes();
      
      for (var i = 0; i < nodes.length; ++i) {
        var node = nodes[i];
        var className = node.getAttribute(React.ujs.CLASS_NAME_ATTR);
        
        // Assume className is simple and can be found at top-level (window).
        // Fallback to eval to handle cases like 'My.React.ComponentName'.
        var constructor = window[className] || eval.call(window, className);
        var propsJson = node.getAttribute(React.ujs.PROPS_ATTR);
        var props = propsJson && JSON.parse(propsJson);
        
        React.render(React.createElement(constructor, props), node);
      }
    },
    
    unmountComponents: function() {
      var nodes = React.ujs.findDOMNodes();
      
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
    handleEvent('page:change', React.ujs.mountComponents);
    handleEvent('page:receive', React.ujs.unmountComponents);
  }

  function handleNativeEvents() {
    if ($) {
      
      $(React.ujs.mountComponents);
      $(window).unload(React.ujs.unmountComponents);
      
    } else {
      
      document.addEventListener('DOMContentLoaded', React.ujs.mountComponents);
      window.addEventListener('unload', React.ujs.unmountComponents);
    }
  }

  if (typeof Turbolinks !== 'undefined' && Turbolinks.supported) {
    handleTurbolinksEvents();
  } else {
    handleNativeEvents();
  }
  
})(document, window, React);
