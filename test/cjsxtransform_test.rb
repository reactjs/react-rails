require 'test_helper'

# The transformer is inserting a newline after the docblock for some reason...
EXPECTED_JS_3 = <<eos
(function() {
  var Component;

  Component = React.createClass({
    render: function() {
      return ExampleComponent( {"videos" : this.props.videos} );
    }
  });

}).call(this);
eos

class CJSXTransformTest < ActionDispatch::IntegrationTest
  test 'asset pipeline should transform CJSX + Coffeescript' do
    get 'assets/cjsx_example.js'
    assert_response :success

    # Different coffee-script may generate slightly different outputs:
    #  1. Some version inserts an extra "\n" at the beginning.
    #  2. "/** @jsx React.DOM */" and "/** @jsx React.DOM*/" are both possible.
    #
    # Because appraisal is used, multiple versions of coffee-script are treated
    # together. Remove all spaces to make test pass.
    response = @response.body
    response.sub!(/^\/\/.*$/, '')
    response = response.gsub(/\s/, '')
    assert_equal EXPECTED_JS_3.gsub(/\s/, ''), response
  end
end
