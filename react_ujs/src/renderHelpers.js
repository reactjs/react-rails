const ReactDOMClient = require("react-dom/client")

export function supportsHydration() {
  return typeof ReactDOMClient.hydrate === "function" || typeof ReactDOMClient.hydrateRoot === "function"
}

export function reactHydrate(node, component) {
  if (typeof ReactDOMClient.hydrateRoot === "function") {
    return ReactDOMClient.hydrateRoot(node, component)
  } else {
    return ReactDOMClient.hydrate(component, node)
  }
}

export function createReactRootLike(node) {
  return ReactDOMClient.createRoot ? ReactDOMClient.createRoot(node) : legacyReactRootLike(node)
}

function legacyReactRootLike(node) {
  const root = {
    render(component) {
      return ReactDOMClient.render(component, node)
    }
  }
  return root
}
