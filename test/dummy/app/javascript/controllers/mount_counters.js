var { Controller } = require("@hotwired/stimulus");
var ReactRailsUJS = require("react_ujs");

module.exports = class extends Controller {
  connect() {
    this.observeChange();
  }

  disconnect() {
    this.observer.disconnect();
  }

  observeChange() {
    var element = this.element;
    var callback = function (mutationsList, _observer) {
      mutationsList.forEach(function (mutation) {
        if (mutation.type === "childList") {
          ReactRailsUJS.mountComponents(element);
        }
      });
    };

    this.observer = new MutationObserver(callback);
    this.observer.observe(this.element, { childList: true });
  }
};
