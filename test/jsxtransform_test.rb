require 'test_helper'

# The transformer is inserting a newline after the docblock for some reason...
EXPECTED_JS = <<eos
/** @jsx React.DOM */

React.DOM.div(null);
eos

class JSXTransformTest < ActionDispatch::IntegrationTest

  test 'asset pipeline should transform JSX' do
    get 'assets/example.js'
    assert_response :success
    assert_equal EXPECTED_JS, @response.body
  end

end
