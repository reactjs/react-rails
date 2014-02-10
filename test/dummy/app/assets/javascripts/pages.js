var HelloMessage = React.createClass({
  getInitialState: function() {
    return {greeting: 'Hello'};
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
