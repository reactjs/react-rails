;(function(document, window) {
  window.ReactRailsUJS.TurbolinksClassic = {
    // Attach handlers to Turbolinks-Classic events
    // for mounting and unmounting components
    setup: function() {
      ReactRailsUJS.handleEvent(Turbolinks.EVENTS.CHANGE, function() {window.ReactRailsUJS.mountComponents()});
      ReactRailsUJS.handleEvent(Turbolinks.EVENTS.BEFORE_UNLOAD, function() {window.ReactRailsUJS.unmountComponents()});
    }
  };
})(document, window);
