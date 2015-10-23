var addons = {};
addons.TransitionGroup = require("react-addons-transition-group");
addons.CSSTransitionGroup = require("react-addons-css-transition-group");
addons.LinkedStateMixin = require("react-addons-linked-state-mixin");
addons.cloneWithProps = require("react-addons-clone-with-props");
addons.createFragment = require("react-addons-create-fragment");
addons.update = require("react-addons-update");
addons.PureRenderMixin = require("react-addons-pure-render-mixin");

if (process.env.NODE_ENV !== "production") {
  addons.TestUtils = require("react-addons-test-utils");
  addons.Perf = require("react-addons-perf");
}

module.exports = addons;
