require "test_helper"

WebpackerHelpers.when_webpacker_available do
  class WebpackerManifestContainerTest < ActiveSupport::TestCase
    test "it loads JS from the webpacker container" do
      container = React::ServerRendering::WebpackerManifestContainer.new
      js_file = container.find_asset("application.js")
      # Main file:
      assert_includes js_file, "ReactRailsUJS.loadContext(ctx)"
      # Bundled dependencies:
      assert_includes js_file, "ExportDefaultComponent"
    end
  end
end
