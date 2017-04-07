var React = require("react")

module.exports = React.createClass({
  getInitialState: function() {
    var initialGreeting = 'Hello';
    if (typeof global !== "undefined" && global.ctx && global.ctx.greeting) {
      initialGreeting = global.ctx.greeting
    }

    return {
      greeting: initialGreeting
    }
  },
  goodbye: function() {
    this.setState({greeting: 'Goodbye'});
  },
  render: function() {
    return React.DOM.div({},
      React.DOM.div({}, this.state.greeting, ' ', this.props.name),
      React.DOM.button({onClick: this.goodbye}, 'Goodbye')
    );
  }
});
