require "test_helper"

# Rails 3.x doesn't have `application.assets_manifest=`
# I don't think we have to support Rails 3 + Sprockets 3 anyways!
if Rails::VERSION::MAJOR > 3
  class ManifestContainerTest < ActiveSupport::TestCase
    def setup
      precompile_assets

      @manifest_container = React::ServerRendering::ManifestContainer.new
    end

    def teardown
      clear_precompiled_assets
    end

    def test_find_asset_gets_asset_contents
      application_js_content = @manifest_container.find_asset("application.js")
      assert(application_js_content.length > 50000, "It's the compiled file")
    end
  end
end
