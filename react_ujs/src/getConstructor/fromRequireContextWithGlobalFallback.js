// Make a function which:
// - First tries to require the name
// - Then falls back to global lookup
var fromGlobal = require("./fromGlobal")
var fromRequireContext = require("./fromRequireContext")

module.exports = function(reqctx) {
  var fromCtx = fromRequireContext(reqctx)
  return function(className) {
    var component;
    try {
      // `require` will raise an error if this className isn't found:
      component = fromCtx(className)
    } catch (err) {
      // fallback to global:
      component = fromGlobal(className)
    }
    return component
  }
}
