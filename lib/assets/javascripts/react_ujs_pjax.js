;(function(document, window) {
  window.ReactRailsUJS.pjax = {
    // Turbolinks 5+ got rid of named events (?!)
    setup: function() {
      ReactRailsUJS.handleEvent('pjax:end', function() {window.ReactRailsUJS.mountComponents()});
      ReactRailsUJS.handleEvent('pjax:beforeReplace', function() {window.ReactRailsUJS.unmountComponents()});
    }
  };
})(document, window);
