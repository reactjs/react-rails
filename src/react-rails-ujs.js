import React from 'react';
import ReactDOM from 'react-dom';

const defaultConfig = {
  'NAME_ATTR': 'data-react-class',
  'PROPS_ATTR': 'data-react-props',
};

export function mountComponents(components, configOverrides = {}) {
  const config = Object.assign({}, defaultConfig, configOverrides);
  const nodes = window.document.querySelectorAll(`[${config.NAME_ATTR}]`);

  for (let i = 0; i < nodes.length; ++i) {
    const node = nodes[i];
    const componentName = node.getAttribute(config.NAME_ATTR);
    const component = components[componentName];
    const propsJson = node.getAttribute(config.PROPS_ATTR);
    const props = propsJson && JSON.parse(propsJson);

    if (typeof(component) === "undefined") {
      const message = "Cannot find component: '" + componentName + "'";
      if (console && console.log) {
        console.log(`%c[react-rails-ujs] %c${message} for element`, "font-weight: bold", "", node);
      }
      throw new Error(`[react-rails-ujs] ${message}`);
    } else {
      ReactDOM.render(React.createElement(component, props), node);
    }
  }
}
