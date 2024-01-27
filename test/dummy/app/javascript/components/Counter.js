var React = require("react");
var createReactClass = require("create-react-class");

module.exports = createReactClass({
  getInitialState: function () {
    return { count: 0 };
  },
  handleClick: function () {
    this.setState({ count: this.state.count + 1 });
  },
  render: function () {
    return (
      <div>
        <p>
          {this.props.name} - {this.state.count}
        </p>
        <button type="button" onClick={this.handleClick}>
          Increment {this.props.name}
        </button>
      </div>
    );
  },
});
