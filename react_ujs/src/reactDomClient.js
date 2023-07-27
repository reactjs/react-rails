import ReactDOM from "react-dom"
import supportsRootApi from "./supportsRootApi"

let reactDomClient = ReactDOM

if (supportsRootApi) {
  // This will never throw an exception, but it's the way to tell Webpack the dependency is optional
  // https://github.com/webpack/webpack/issues/339#issuecomment-47739112
  // Unfortunately, it only converts the error to a warning.
  try {
    // eslint-disable-next-line global-require,import/no-unresolved
    reactDomClient = require('react-dom/client');
  } catch (e) {
    // We should never get here, but if we do, we'll just use the default ReactDOM
    // and live with the warning.
    reactDomClient = ReactDOM;
  }
}

export default reactDomClient
