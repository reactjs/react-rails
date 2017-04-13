module.exports = {
  // Before Turbolinks 2.4.0, Turbolinks didn't
  // have named events and didn't have a before-unload event.
  // Also, it didn't work with the Turbolinks cache, see
  // https://github.com/reactjs/react-rails/issues/87
  setup: function(ujs) {
    Turbolinks.pagesCached(0)
    ujs.handleEvent('page:change', ujs.handleMount);
    ujs.handleEvent('page:receive', ujs.handleUnmount);
  },
  teardown: function(ujs) {
    ujs.removeEvent('page:change', ujs.handleMount);
    ujs.removeEvent('page:receive', ujs.handleUnmount);
  }
}
