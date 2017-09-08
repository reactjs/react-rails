var React = require("react")
module.exports = React.createClass({
  render: function() {
    return React.createElement("li", null, this.props.todo)
  }
})
