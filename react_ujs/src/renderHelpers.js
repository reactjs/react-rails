const ReactDOM = require("react-dom")
var ReactDOMClient = ReactDOM

// React 18+.
const supportsReactCreateRoot = ReactDOM.version && parseInt(ReactDOM.version.split('.')[0], 10) >= 18;
if (supportsReactCreateRoot) {
  // This will never throw an exception, but it's the way to tell Webpack the dependency is optional
  // https://github.com/webpack/webpack/issues/339#issuecomment-47739112
  // Unfortunately, it only converts the error to a warning.
  try {
    // eslint-disable-next-line global-require,import/no-unresolved
    ReactDOMClient = require("react-dom/client")
  } catch (e) {
    // We should never get here, but if we do, we'll just use the default ReactDOM
    // and live with the warning.
    ReactDOMClient = ReactDOM;
  }
}

export function supportsHydration() {
  return typeof ReactDOM.hydrate === "function" || typeof ReactDOMClient.hydrateRoot === "function"
}

export function reactHydrate(node, component) {
  if (typeof ReactDOMClient.hydrateRoot === "function") {
    return ReactDOMClient.hydrateRoot(node, component)
  } else {
    return ReactDOM.hydrate(component, node)
  }
}

export function createReactRootLike(node) {
  return ReactDOMClient.createRoot ? ReactDOMClient.createRoot(node) : legacyReactRootLike(node)
}

function legacyReactRootLike(node) {
  const root = {
    render(component) {
      return ReactDOM.render(component, node)
    }
  }
  return root
}
