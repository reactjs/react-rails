//= require_self
//= require_tree ./components

// This is because we compile this file into a JS VM
// for server rendering, and some components may be
// .coffee and wrapped in a func, so they need a
// global to glom on to.
var self, window, global = global || window || self;
