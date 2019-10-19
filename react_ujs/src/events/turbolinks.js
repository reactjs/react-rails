module.exports = {
  // Turbolinks 5+ got rid of named events (?!)
  setup: function(ujs) {
  	ujs.handleEvent('turbolinks:load', ujs.handleMount);
    ujs.handleEvent('turbolinks:before-render', ujs.handleUnmount);
  },

  teardown: function(ujs) {
  	ujs.removeEvent('turbolinks:load', ujs.handleMount);
    ujs.removeEvent('turbolinks:before-render', ujs.handleUnmount);
  },
}
