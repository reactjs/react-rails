Todo = React.createClass
  render: ->
    `<li>{this.props.todo}</li>`

# Because Coffee files are in an anonymous function,
# expose it for server rendering tests
this.Todo = Todo
