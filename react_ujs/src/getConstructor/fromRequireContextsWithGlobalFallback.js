// Make a function which:
// - First tries to require the name
// - Then falls back to global lookup
var fromGlobal = require("./fromGlobal")
var fromRequireContext = require("./fromRequireContext")

module.exports = function(reqctxs) {
  var fromCtxs = reqctxs.map((reqctx) => fromRequireContext(reqctx))
  return function(className) {
    var component;
    try {
      var index = 0, fromCtx, firstErr;
      do {
        fromCtx = fromCtxs[index];

        try {
          // `require` will raise an error if this className isn't found:
          component = fromCtx(className)
        } catch (fromCtxErr) {
          if (!firstErr) {
            firstErr = fromCtxErr;
          }
        }

        index += 1;
      } while (index < fromCtxs.length);
      if (!component) throw firstErr;
    } catch (firstErr) {
      // fallback to global:
      try {
        component = fromGlobal(className)
      } catch (secondErr) {
        console.error(firstErr)
        console.error(secondErr)
      }
    }
    return component
  }
}
