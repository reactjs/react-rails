require 'test_helper'

# The transformer is inserting a newline after the docblock for some reason...
EXPECTED_JS = <<eos
/** @jsx React.DOM */

React.DOM.div(null);
eos

EXPECTED_JS_2 = <<eos
/** @jsx React.DOM*/


(function() {
  var Component;

  Component = React.createClass({displayName: 'Component',
    render: function() {
      return ExampleComponent( {videos:this.props.videos} );
    }
  });

}).call(this);
eos

class JSXTransformTest < ActionDispatch::IntegrationTest

  test 'asset pipeline should transform JSX' do
    get 'assets/example.js'
    assert_response :success
    assert_equal EXPECTED_JS, @response.body
  end

  test 'asset pipeline should transform JSX + Coffeescript' do
    get 'assets/example2.js'
    assert_response :success
    assert_equal EXPECTED_JS_2, @response.body
  end

end
