# frozen_string_literal: true

require "test_helper"

class JSXPreprocessorTest < ActiveSupport::TestCase
  SprocketsHelpers.when_available do
    required_javascript = "var requirePlainJavascript = true;"
    required_coffeescript = "var requireCoffee; requireCoffee = true;"
    required_jsx = 'React.createElement("div", { className: "require-jsx" });'
    own_jsx = 'React.createElement("div", { className: "le-javascript" });'
    test "executes //= require directives" do
      require_parent = SprocketsHelpers.fetch_asset_body("require_test/jsx_preprocessor_test.js")

      assert_compiled_javascript_includes(require_parent, required_javascript)
      assert_compiled_javascript_includes(require_parent, required_coffeescript)
      assert_compiled_javascript_includes(require_parent, required_jsx)
      assert_compiled_javascript_includes(require_parent, own_jsx)
    end
  end
end
