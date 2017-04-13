require "test_helper"

if Rails::VERSION::MAJOR == 3
  class YamlManifestContainerTest < ActiveSupport::TestCase
    def setup
      SprocketsHelpers.precompile_assets

      @manifest_container = React::ServerRendering::YamlManifestContainer.new
    end

    def teardown
      SprocketsHelpers.clear_precompiled_assets
    end

    def test_find_asset_gets_asset_contents
      application_js_content = @manifest_container.find_asset("application.js")
      assert(application_js_content.length > 50000, "It's the compiled file")
    end
  end
end
