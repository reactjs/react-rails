import ReactDOM from "./reactDomClient"
import supportsRootApi from "./supportsRootApi"

export function supportsHydration() {
  return typeof ReactDOM.hydrate === "function" || typeof ReactDOM.hydrateRoot === "function"
}

export function reactHydrate(node, component) {
  if (typeof ReactDOM.hydrateRoot === "function") {
    return ReactDOM.hydrateRoot(node, component)
  } else {
    return ReactDOM.hydrate(component, node)
  }
}

export function createReactRootLike(node) {
  if(supportsRootApi) {
    return ReactDOM.createRoot(node)
  }
  return legacyReactRootLike(node)
}

function legacyReactRootLike(node) {
  const root = {
    render(component) {
      return ReactDOM.render(component, node)
    }
  }
  return root
}
