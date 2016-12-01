var React = require("react");
var ReactDOMServer = require("react-dom/server");

React.addons = require("./addons-object.js");

global.React = React;
global.ReactDOMServer = ReactDOMServer;