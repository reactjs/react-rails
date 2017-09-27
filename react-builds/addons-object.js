var addons = {};
addons.TransitionGroup = require("react-transition-group/TransitionGroup");
addons.CSSTransitionGroup = require("react-transition-group/CSSTransitionGroup");
addons.update = require("immutability-helper");

if (process.env.NODE_ENV !== "production") {
  addons.TestUtils = require("react-dom/test-utils");
}

module.exports = addons;
