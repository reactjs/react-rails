var GreetingMessage = createReactClass({
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
    return React.createElement('div', {},
      React.createElement('div', {}, this.state.greeting, ' ', this.props.name ),
      React.createElement('button', {onClick: this.goodbye}, 'Goodbye')
    );
  }
});
