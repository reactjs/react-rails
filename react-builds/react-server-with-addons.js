var React = require("react");
var ReactDOMServer = require("react-dom/server");
var createReactClass = require("create-react-class");
var PropTypes = require("prop-types");

React.addons = require("./addons-object.js");

global.React = React;
global.ReactDOMServer = ReactDOMServer;
global.createReactClass = createReactClass;
global.PropTypes = PropTypes;
