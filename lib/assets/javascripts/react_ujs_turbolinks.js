;(function(document, window) {
  window.ReactRailsUJS.Turbolinks = {
    // Turbolinks 5+ got rid of named events (?!)
    setup: function() {
      ReactRailsUJS.handleEvent('turbolinks:load', function() {window.ReactRailsUJS.mountComponents()});
      ReactRailsUJS.handleEvent('turbolinks:before-cache', function() {window.ReactRailsUJS.unmountComponents()});
    }
  };
})(document, window);
