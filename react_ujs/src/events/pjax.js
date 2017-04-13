module.exports = {
  // pjax support
  setup: function(ujs) {
    ujs.handleEvent('ready', function() { ujs.mountComponents() });
    ujs.handleEvent('pjax:end', function(e) { ujs.mountComponents(e.target) });
    ujs.handleEvent('pjax:beforeReplace', function(e) { ujs.unmountComponents(e.target) });
  }
}
