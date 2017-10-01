var React = require("react")

module.exports = React.createClass({
  getInitialState: function() {
    console.log('got initial state');
    return({mounted: "nope"});
  },
  componentWillMount: function() {
    console.warn('mounted component');
    this.setState({mounted: 'yep'});
  },
  render: function() {
    var x = 'foo';
    console.error('rendered!', x);
    return (
      <ul>
        <li>Console Logged</li>
        <li id='status'>{this.state.mounted}</li>
        {this.props.todos.map(function(todo, i) {
          return (<li key={i}>{todo}</li>)
        })}
      </ul>
    )
  }
})
