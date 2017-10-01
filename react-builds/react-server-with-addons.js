var React = require("react");
var ReactDOMServer = require("react-dom/server");
var PropTypes = require("prop-types");

React.addons = require("./addons-object.js");

global.React = React;
global.ReactDOMServer = ReactDOMServer;
global.PropTypes = PropTypes;
