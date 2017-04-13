var console = { history: [] };
['error', 'log', 'info', 'warn'].forEach(function (fn) {
  console[fn] = function () {
    console.history.push({level: fn, arguments: Array.prototype.slice.call(arguments)});
  };
});
