module.exports = {
  // Attach handlers to Turbolinks-Classic events
  // for mounting and unmounting components
  setup: function(ujs) {
    ujs.handleEvent(Turbolinks.EVENTS.CHANGE, function() { ujs.mountComponents() });
    ujs.handleEvent(Turbolinks.EVENTS.BEFORE_UNLOAD, function() { ujs.unmountComponents() });
  }
}
