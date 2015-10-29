require 'test_helper'

class JSXTransformerTest < ActionDispatch::IntegrationTest
  setup do
    reset_transformer
    React::JSX.transformer_class = React::JSX::JSXTransformer
  end

  teardown do
    reset_transformer
  end

  test 'can use dropped-in version of JSX transformer' do
    hidden_path =     Rails.root.join("vendor/assets/react/JSXTransformer__.js")
    replacing_path =  Rails.root.join("vendor/assets/react/JSXTransformer.js")

    FileUtils.cp hidden_path, replacing_path
    get '/assets/example3.js'
    FileUtils.rm replacing_path

    assert_response :success
    assert_equal 'test_confirmation_token_jsx_transformed;', @response.body.strip
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
    assert_equal 'test_confirmation_token_jsx_transformed;', @response.body.strip
  end

end
