var React = require("react")
module.exports = React.createClass({
  componentWillMount: function () {
    setTimeout(function () {}, 1000)
    clearTimeout(0)
  },
  render: function () {
    return <span>I am rendered!</span>
  }
})
