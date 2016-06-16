require "test_helper"

# sprockets-rails < 2.2.2 does not support
# `application.assets_manifest`. Since sprockets-rails < 2.1.2 does
# not define `Sprockets::Rails::VERSION`, checking for
# `Sprockets::Rails` is not enough.
if defined?(Sprockets::Rails::VERSION) &&
    Gem::Version.new(Sprockets::Rails::VERSION) >= Gem::Version.new('2.2.2')

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
