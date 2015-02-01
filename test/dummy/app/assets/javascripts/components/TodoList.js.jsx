TodoList = React.createClass({
  getInitialState: function() {
    return({mounted: "nope"});
  },
  componentWillMount: function() {
    this.setState({mounted: 'yep'});
  },
  render: function() {
    var header = window.todoHeader ? window.todoHeader() : null;

    return (
      <ul>
        {header}
        <li id='status'>{this.state.mounted}</li>
        {this.props.todos.map(function(todo, i) {
          return (<Todo key={i} todo={todo} />)
        })}
      </ul>
    )
  }
})
