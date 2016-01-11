require 'test_helper'
class ReactTest < ActionDispatch::IntegrationTest
  setup do
    clear_sprockets_cache
  end

  teardown do
    clear_sprockets_cache
  end

  test 'asset pipeline should deliver drop-in react file replacement' do
    app_react_file_path = File.expand_path("../dummy/vendor/assets/javascripts/react.js",  __FILE__)
    react_file_token = "'test_confirmation_token_react_content_non_production';\n"
    File.write(app_react_file_path, react_file_token)
    manually_expire_asset("react.js")
    react_asset = Rails.application.assets['react.js']

    get '/assets/react.js'

    File.unlink(app_react_file_path)

    assert_response :success
    assert_equal react_file_token.length, react_asset.to_s.length, "The asset pipeline serves the drop-in file"
    assert_equal react_file_token.length, @response.body.length, "The asset route serves the drop-in file"
  end

  test 'precompiling assets works' do
    begin
      precompile_assets
    ensure
      clear_precompiled_assets
    end
  end

  test "the development version with addons is loaded" do
    asset = Rails.application.assets.find_asset('react')
    assert asset.pathname.to_s.end_with?('development-with-addons/react.js')
  end

  test "the production build is optimized for production" do
    production_path = File.expand_path("../../lib/assets/react-source/production/react.js", __FILE__)
    production_js = File.read(production_path)
    env_checks = production_js.scan("NODE_ENV")
    assert_equal(0, env_checks.length, "Dead code is removed for production")
  end
end
