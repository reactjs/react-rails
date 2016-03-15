;(function(document, window) {
  window.ReactRailsUJS.pjax = {
    // pjax support
    setup: function() {
      ReactRailsUJS.handleEvent('ready', function() {window.ReactRailsUJS.mountComponents()});
      ReactRailsUJS.handleEvent('pjax:end', function(e) {window.ReactRailsUJS.mountComponents(e.target)});
      ReactRailsUJS.handleEvent('pjax:beforeReplace', function(e) {window.ReactRailsUJS.unmountComponents(e.target)});
    }
  };
})(document, window);
