var React = require("react");
var ReactDOMServer = require("react-dom/server");
var createReactClass = require("create-react-class");
var PropTypes = require("prop-types");
var {TextEncoder, TextDecoder} = require("fastestsmallesttextencoderdecoder");

global.React = React;
global.ReactDOMServer = ReactDOMServer;
global.createReactClass = createReactClass;
global.PropTypes = PropTypes;
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
