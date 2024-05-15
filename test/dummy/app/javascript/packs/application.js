require("@hotwired/turbo-rails");
var { Application } = require("@hotwired/stimulus");
var MountCountersController = require("../controllers/mount_counters");

window.Stimulus = Application.start();
Stimulus.register("mount-counters", MountCountersController);

var ctx = require.context("components", true);
var ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(ctx);
var React = require("react");

window.GlobalComponent = function (props) {
  return React.createElement("h1", null, "Global Component");
};
