require 'test_helper'

when_sprockets_available do
  class JSXPreprocessorTest < ActionDispatch::IntegrationTest
    EXPECTED_JS = <<javascript
React.createElement(\"div\", { className: \"le-javascript-child\" });
React.createElement(\"div\", { className: \"le-javascript\" });
javascript

    test 'executes //= require directives' do
      get '/assets/require_test/jsx_preprocessor_test.js'
      assert_response :success
      assert_compiled_javascript_matches(@response.body, EXPECTED_JS)
    end
  end
end
