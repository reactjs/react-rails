var ReactDOM = require("react-dom")

var reactMajorVersion, supportsRootApi;
if (typeof ReactDOM != "undefined") {
  reactMajorVersion = ReactDOM.version.split('.')[0] || 16

  // TODO: once we require React 18, we can remove this and inline everything guarded by it.
  supportsRootApi = reactMajorVersion >= 18
} else {
  supportsRootApi = false
}

module.exports = supportsRootApi
