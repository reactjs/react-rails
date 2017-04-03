module.exports = {
  // Turbolinks 5+ got rid of named events (?!)
  setup: function(ujs) {
    ujs.handleEvent('turbolinks:load', function() { ujs.mountComponents() });
    ujs.handleEvent('turbolinks:before-render', function() { ujs.unmountComponents() });
  },
}
