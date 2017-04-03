module.exports = {
  // Attach handlers to browser events to mount
  // (There are no unmount handlers since the page is destroyed on navigation)
  setup: function(ujs) {
    if (ujs.jQuery) {
      // Use jQuery if it's present:
      ujs.jQuery(function() { ujs.mountComponents() });
    } else if ('addEventListener' in window) {
      document.addEventListener('DOMContentLoaded', function() { ujs.mountComponents() });
    } else {
      // add support to IE8 without jQuery
      window.attachEvent('onload', function() { ujs.mountComponents() });
    }
  }
}
