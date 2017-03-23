'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mountComponents = mountComponents;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultConfig = {
  'NAME_ATTR': 'data-react-class',
  'PROPS_ATTR': 'data-react-props',
  render: function render(component, props) {
    return _react2.default.createElement(component, props);
  },
  strict: true
};

function mountComponents(components) {
  var configOverrides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var config = Object.assign({}, defaultConfig, configOverrides);
  var nodes = window.document.querySelectorAll('[' + config.NAME_ATTR + ']');

  for (var i = 0; i < nodes.length; ++i) {
    var node = nodes[i];
    var componentName = node.getAttribute(config.NAME_ATTR);
    var component = components[componentName];
    var propsJson = node.getAttribute(config.PROPS_ATTR);
    var props = propsJson && JSON.parse(propsJson);

    if (typeof component === "undefined") {
      var message = "Cannot find component: '" + componentName + "'";
      if (console && console.log) {
        console.log('%c[react-rails-ujs] %c' + message + ' for element', "font-weight: bold", "", node);
      }
      if (config.strict) {
        throw new Error('[react-rails-ujs] ' + message);
      }
    } else {
      _reactDom2.default.render(config.render(component, props), node);
    }
  }
}