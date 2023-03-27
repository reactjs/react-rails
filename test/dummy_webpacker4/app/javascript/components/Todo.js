var React = require("react")
var createReactClass = require("create-react-class")

module.exports = createReactClass({
  render: function() {
    return React.createElement("li", null, this.props.todo)
  }
})
