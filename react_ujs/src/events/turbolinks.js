module.exports = {
  // Turbolinks 5+ got rid of named events (?!)
  setup: function(ujs) {
  	ujs.handleEvent('turbolinks:load', ujs.handleMount);
  },

  teardown: function(ujs) {
  	ujs.removeEvent('turbolinks:load', ujs.handleMount);
  },
}
