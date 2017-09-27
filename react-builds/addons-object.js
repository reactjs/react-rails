var addons = {};
addons.TransitionGroup = require("react-transition-group/TransitionGroup");
addons.CSSTransitionGroup = require("react-transition-group/CSSTransitionGroup");
addons.LinkedStateMixin = require("react-addons-linked-state-mixin");
addons.createFragment = require("react-addons-create-fragment");
addons.update = require("immutability-helper");
addons.PureRenderMixin = require("react-addons-pure-render-mixin");

if (process.env.NODE_ENV !== "production") {
  addons.TestUtils = require("react-dom/test-utils");
  addons.Perf = require("react-addons-perf");
}

module.exports = addons;
