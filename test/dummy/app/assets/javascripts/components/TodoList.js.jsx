/** @jsx React.DOM */

TodoList = React.createClass({
  getInitialState: function() {
    return({mounted: "nope"});
  },
  componentWillMount: function() {
    this.setState({mounted: 'yep'});
  },
  render: function() {
    return (
      <ul>
        <li id='status'>{this.state.mounted}</li>
        {this.props.todos.map(function(todo, i) {
          return (<Todo key={i} todo={todo} />)
        })}
      </ul>
    )
  }
})

