# frozen_string_literal: true

require "test_helper"

# Sprockets is inserting a newline after the docblock for some reason...
EXPECTED_JS = <<~STR
  [2].concat([1]);React.createElement("div", null);
STR

EXPECTED_JS_2 = <<~STR
  (function() {
    var Component;

    Component = createReactClass({
      render: function() {
        return React.createElement(ExampleComponent, {videos:this.props.videos} );
      }
    });

    this.Component = Component;
  }).call(this);
STR

class NullTransformer
  def initialize(_options = {}); end # rubocop:disable-line Style/RedundantInitialize

  def transform(_code)
    "TRANSFORMED CODE!;\n"
  end
end

class JSXTransformTest < ActionDispatch::IntegrationTest
  SprocketsHelpers.when_available do
    setup do
      reset_transformer
    end

    teardown do
      reset_transformer
    end

    test "asset pipeline should transform JSX" do
      SprocketsHelpers.manually_expire_asset("example.js")
      get "/assets/example.js"

      assert_response :success
      assert_compiled_javascript_matches(EXPECTED_JS, @response.body)
    end

    test "asset pipeline should transform JSX + Coffeescript" do
      SprocketsHelpers.manually_expire_asset("example2.js")
      get "/assets/example2.js"

      assert_response :success
      assert_compiled_javascript_matches(EXPECTED_JS_2, @response.body)
    end

    test "use a custom transformer" do
      React::JSX.transformer_class = NullTransformer
      SprocketsHelpers.manually_expire_asset("example2.js")
      get "/assets/example2.js"

      assert_equal "TRANSFORMED CODE!;\n", @response.body
    end

    def test_babel_transformer_accepts_babel_transformation_options
      React::JSX.transform_options = { blacklist: ["spec.functionName", "validation.react", "strict"] }
      SprocketsHelpers.manually_expire_asset("example.js")
      get "/assets/example.js"

      assert_response :success

      refute_includes @response.body, "strict"
    end
  end
end
