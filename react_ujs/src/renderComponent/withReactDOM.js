var ReactDOM = require("react-dom")

// Render React component via ReactDOM, for example:
//
// - `renderComponent("hydrate", component, node, props)` -> `ReactDOM.hydrate(component, node);`
// - `renderComponent("render", component, node, props)` -> `ReactDOM.render(component, node);`
//
module.exports = function(renderFunctionName, component, node) {
  ReactDOM[renderFunctionName](component, node);
};
