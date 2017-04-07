require "test_helper"
require "open-uri"

WebpackerHelpers.when_webpacker_available do
  class WebpackerManifestContainerTest < ActiveSupport::TestCase
    setup do
      WebpackerHelpers.clear_webpacker_packs
    end

    test "it loads JS from the webpacker container" do
      WebpackerHelpers.compile
      container = React::ServerRendering::WebpackerManifestContainer.new
      js_file = container.find_asset("application.js")
      # Main file:
      assert_includes js_file, "ReactRailsUJS.loadContext(ctx)"
      # Bundled dependencies:
      assert_includes js_file, "ExportDefaultComponent"
    end

    def test_it_loads_from_webpack_dev_server
      WebpackerHelpers.with_dev_server do
        container = React::ServerRendering::WebpackerManifestContainer.new
        js_file = container.find_asset("application.js")
        # Main file:
        assert_includes js_file, "ReactRailsUJS.loadContext(ctx)"
        # Bundled dependencies:
        assert_includes js_file, "ExportDefaultComponent"
      end
    end
  end
end
