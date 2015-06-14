require 'test_helper'
require 'fileutils'

# Sprockets is inserting a newline after the docblock for some reason...
EXPECTED_JS = <<eos
"use strict";

React.createElement("div", null);
eos

EXPECTED_JS_2 = <<eos
"use strict";

(function() {
  var Component;

  Component = React.createClass({displayName: "Component",
    render: function() {
      return React.createElement(ExampleComponent, {videos:this.props.videos} );
    }
  });

  window.Component = Component;
}).call(this);
eos

class NullTransformer
  def initialize(options={}); end
  def transform(code)
    "TRANSFORMED CODE!;\n"
  end
end

class JSXTransformTest < ActionDispatch::IntegrationTest
  setup do
    clear_sprockets_cache
    React::JSX.transformer_class = React::JSX::BabelTransformer
    React::JSX.transform_options = {}
  end

  teardown do
    clear_sprockets_cache
  end

  test 'asset pipeline should transform JSX' do
    get '/assets/example.js'
    assert_response :success

    assert_equal EXPECTED_JS.gsub(/\s/, ''), @response.body.gsub(/\s/, '')
  end

  test 'asset pipeline should transform JSX + Coffeescript' do
    get '/assets/example2.js'
    assert_response :success
    # Different coffee-script may generate slightly different outputs,
    # as some version inserts an extra "\n" at the beginning.
    # Because appraisal is used, multiple versions of coffee-script are treated
    # together. Remove all spaces to make test pass.
    # puts @response.body
    assert_equal EXPECTED_JS_2.gsub(/\s/, ''), @response.body.gsub(/\s/, '')
  end

  test 'use a custom transformer' do
    React::JSX.transformer_class = NullTransformer
    manually_expire_asset('example2.js')
    get '/assets/example2.js'
    assert_equal "TRANSFORMED CODE!;\n", @response.body
  end

  def test_babel_transformer_accepts_babel_transformation_options
    React::JSX.transform_options = {blacklist: ['spec.functionName', 'validation.react', "strict"]}
    get '/assets/example.js'
    assert_response :success

    assert_not_includes @response.body, 'strict'
  end

end

class JSXTransformerTest < ActionDispatch::IntegrationTest

  setup do
    clear_sprockets_cache
    React::JSX.transformer_class = React::JSX::JSXTransformer
    React::JSX.transform_options = {}
  end

  teardown do
    clear_sprockets_cache
  end

  test 'can use dropped-in version of JSX transformer' do
    hidden_path =     Rails.root.join("vendor/assets/react/JSXTransformer__.js")
    replacing_path =  Rails.root.join("vendor/assets/react/JSXTransformer.js")

    FileUtils.cp hidden_path, replacing_path
    get '/assets/example3.js'
    FileUtils.rm replacing_path

    assert_response :success
    assert_equal 'test_confirmation_token_jsx_transformed;', @response.body
  end

  test 'accepts harmony: true option' do
    React::JSX.transform_options = {harmony: true}
    get '/assets/harmony_example.js'
    assert_response :success
    assert_match(/generateGreeting:\s*function\(\)/, @response.body, "object literal methods")
    assert_match(/React.__spread/, @response.body, "spreading props")
    assert_match(/Your greeting is: '" \+ insertedGreeting \+ "'/, @response.body, "string interpolation")
    assert_match(/active=\$__0\.active/, @response.body, "destructuring assignment")
  end

  test 'accepts strip_types: true option' do
    React::JSX.transform_options = {strip_types: true, harmony: true}
    get '/assets/flow_types_example.js'
    assert_response :success
    assert_match(/\(i\s*,\s*name\s*\)\s*\{/, @response.body, "type annotations are removed")
  end

  test 'accepts asset_path: option' do
    hidden_path =     Rails.root.join("vendor/assets/react/JSXTransformer__.js")
    custom_path =     Rails.root.join("vendor/assets/react/custom")
    replacing_path =  custom_path.join("CustomTransformer.js")

    React::JSX.transform_options = {asset_path: "custom/CustomTransformer.js"}

    FileUtils.mkdir_p(custom_path)
    FileUtils.cp(hidden_path, replacing_path)
    get '/assets/example3.js'

    FileUtils.rm_rf custom_path
    assert_response :success
    assert_equal 'test_confirmation_token_jsx_transformed;', @response.body
  end

end
