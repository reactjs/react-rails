require 'test_helper'
require 'fileutils'

class ReactTest < ActionDispatch::IntegrationTest

  test 'asset pipeline should deliver react file in a non-production variant' do
    actual_react_file_path = File.expand_path("../dummy/tmp/react-rails/react.js",  __FILE__)
    actual_react_file_content = File.read actual_react_file_path

    react_file_token = "'test_confirmation_token_react_content_non_production';\n";
    File.open(actual_react_file_path, 'w') {|f| f.write react_file_token}

    get 'assets/react.js'

    File.open(actual_react_file_path, 'w') {|f| f.write actual_react_file_content}
    FileUtils.rm_r CACHE_PATH if CACHE_PATH.exist?

    assert_response :success
    assert_equal react_file_token, @response.body
  end

  test 'asset pipeline should deliver drop-in react file replacement' do
    hidden_path = File.expand_path("../dummy/vendor/assets/react/test/react__.js",  __FILE__)
    replacing_path = File.expand_path("../dummy/vendor/assets/react/test/react.js",  __FILE__)

    FileUtils.mv hidden_path, replacing_path
    get 'assets/react.js'

    FileUtils.mv replacing_path, hidden_path
    FileUtils.rm_r CACHE_PATH if CACHE_PATH.exist?

    assert_response :success
    assert_equal "'test_confirmation_token_react_content';\n", @response.body

    React::Renderer.reset_combined_js!
  end

end
