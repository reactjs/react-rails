var React = require("react")
var createReactClass = require("create-react-class")

module.exports = createReactClass({
  getInitialState: function() {
    return({mounted: "nope"});
  },
  componentDidMount: function() {
    this.setState({mounted: 'yep'});
  },
  render: function() {
    console.log("Test Console Replay")
    return (
      <ul>
        <li id='status'>{this.state.mounted}</li>
        {this.props.todos.map(function(todo, i) {
          return (<li key={i}>{todo}</li>)
        })}
        <li>From Webpacker</li>
      </ul>
    )
  }
})
