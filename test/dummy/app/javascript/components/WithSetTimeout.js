var React = require("react")
var createReactClass = require("create-react-class")

module.exports = createReactClass({
  componentWillMount: function () {
    setTimeout(function () {}, 1000)
    clearTimeout(0)
  },
  render: function () {
    return <span>I am rendered!</span>
  }
})
