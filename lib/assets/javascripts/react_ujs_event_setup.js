;(function(document, window) {
  // jQuery is optional. Use it to support legacy browsers.
  var $ = (typeof window.jQuery !== 'undefined') && window.jQuery;
  if ($) {
    ReactRailsUJS.handleEvent = function(eventName, callback) {
      $(document).on(eventName, callback);
    };
  } else {
    ReactRailsUJS.handleEvent = function(eventName, callback) {
      document.addEventListener(eventName, callback);
    };
  }
  // Detect which kind of events to set up:
  if (typeof Turbolinks !== 'undefined' && Turbolinks.supported) {
    if (typeof Turbolinks.EVENTS !== 'undefined') {
      // Turbolinks.EVENTS is in classic version 2.4.0+
      ReactRailsUJS.TurbolinksClassic.setup();
    } else if (typeof Turbolinks.controller !== "undefined") {
      // Turbolinks.controller is in version 5+
      ReactRailsUJS.Turbolinks.setup();
    } else {
      ReactRailsUJS.TurbolinksClassicDeprecated.setup();
    }
  } else {
    ReactRailsUJS.Native.setup();
  }
})(document, window);
