// polyfill TextEncoder & TextDecoder onto `util` b/c `node-util` polyfill doesn't include them
// https://github.com/browserify/node-util/issues/46
import util from 'util';
import 'fast-text-encoding';

Object.assign(util, { TextDecoder, TextEncoder });

var React = require("react");
var ReactDOMServer = require("react-dom/server");
var createReactClass = require("create-react-class");
var PropTypes = require("prop-types");

global.React = React;
global.ReactDOMServer = ReactDOMServer;
global.createReactClass = createReactClass;
global.PropTypes = PropTypes;
