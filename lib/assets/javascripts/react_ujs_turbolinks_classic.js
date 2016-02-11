;(function(document, window) {
  // jQuery is optional. Use it to support legacy browsers.
  var $ = (typeof window.jQuery !== 'undefined') && window.jQuery;

  window.ReactRailsUJS.TurbolinksClassic = {
    // Attach handlers to Turbolinks-Classic events
    // for mounting and unmounting components
    setup: function() {
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
      // Turbolinks.EVENTS is in version 2.4.0+
      handleEvent(Turbolinks.EVENTS.CHANGE, function() {window.ReactRailsUJS.mountComponents()});
      handleEvent(Turbolinks.EVENTS.BEFORE_UNLOAD, function() {window.ReactRailsUJS.unmountComponents()});
    }
  };
})(document, window);
