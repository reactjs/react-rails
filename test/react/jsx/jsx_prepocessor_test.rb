require 'test_helper'

SprocketsHelpers.when_available do
  class JSXPreprocessorTest < ActiveSupport::TestCase
    REQUIRED_JAVASCRIPT = 'var requirePlainJavascript = true;'
    REQUIRED_COFFEESCRIPT =  'var requireCoffee; requireCoffee = true;'
    REQUIRED_JSX = 'React.createElement("div", { className: "require-jsx" });'
    OWN_JSX = 'React.createElement("div", { className: "le-javascript" });'
    test 'executes //= require directives' do
      require_parent = SprocketsHelpers.fetch_asset_body('require_test/jsx_preprocessor_test.js')

      assert_compiled_javascript_includes(require_parent, REQUIRED_JAVASCRIPT)
      assert_compiled_javascript_includes(require_parent, REQUIRED_COFFEESCRIPT)
      assert_compiled_javascript_includes(require_parent, REQUIRED_JSX)
      assert_compiled_javascript_includes(require_parent, OWN_JSX)
    end
  end
end
