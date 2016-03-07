;(function(document, window) {
  window.ReactRailsUJS.pjax = {
    // pjax support
    setup: function() {
      ReactRailsUJS.handleEvent('ready', function() {window.ReactRailsUJS.mountComponents()});      
      ReactRailsUJS.handleEvent('pjax:end', function() {window.ReactRailsUJS.mountComponents()});
      ReactRailsUJS.handleEvent('pjax:beforeReplace', function() {window.ReactRailsUJS.unmountComponents()});
    }
  };
})(document, window);
