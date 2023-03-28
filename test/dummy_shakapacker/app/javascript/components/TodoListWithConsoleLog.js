var React = require("react")
var createReactClass = require("create-react-class")

module.exports = createReactClass({
  getInitialState: function() {
    console.log('got initial state');
    return({mounted: "nope"});
  },
  componentWillMount: function() {
    // This will need to be replaced
    // https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
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
