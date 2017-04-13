module.exports = {
  // Turbolinks 5+ got rid of named events (?!)
  setup: function(ujs) {
    ujs.handleEvent('DOMContentLoaded', function() { ujs.mountComponents() })
    ujs.handleEvent('turbolinks:render', function() { ujs.mountComponents() })
    ujs.handleEvent('turbolinks:before-render', function() { ujs.unmountComponents() })
  },
}
