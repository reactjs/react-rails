require 'test_helper'

SprocketsHelpers.when_available do
  class ReactAssetTest < ActionDispatch::IntegrationTest
    setup do
      SprocketsHelpers.clear_sprockets_cache
    end

    teardown do
      SprocketsHelpers.clear_sprockets_cache
    end

    def test_asset_pipeline_should_deliver_drop_in_react_file_replacement
      app_react_file_path = File.expand_path("../dummy/vendor/assets/javascripts/react.js",  __FILE__)
      react_file_token = "'test_confirmation_token_react_content_non_production';\n"
      File.write(app_react_file_path, react_file_token)
      SprocketsHelpers.manually_expire_asset("react.js")
      react_asset = Rails.application.assets['react.js']

      get '/assets/react.js'

      File.unlink(app_react_file_path)

      assert_response :success
      assert_equal react_file_token.length, react_asset.to_s.length, "The asset pipeline serves the drop-in file"
      assert_equal react_file_token.length, @response.body.length, "The asset route serves the drop-in file"
    end

    def test_precompiling_assets_works
      begin
        SprocketsHelpers.precompile_assets
      ensure
        SprocketsHelpers.clear_precompiled_assets
      end
    end

    def test_the_development_version_with_addons_is_loaded
      asset = Rails.application.assets.find_asset('react')
      path =
        if asset.respond_to?(:pathname)
          # Sprockets < 4
          asset.pathname.to_s
        else
          # Sprockets 4+
          asset.filename
        end
      assert path.end_with?('development-with-addons/react.js')
    end

    def test_the_production_build_is_optimized_for_production
      production_path = File.expand_path("../../lib/assets/react-source/production/react.js", __FILE__)
      production_js = File.read(production_path)
      env_checks = production_js.scan("NODE_ENV")
      assert_equal(0, env_checks.length, "Dead code is removed for production")
    end
  end
end
