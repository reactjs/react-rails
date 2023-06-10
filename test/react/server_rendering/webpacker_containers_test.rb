# frozen_string_literal: true

require "test_helper"
require "open-uri"

class WebpackerManifestContainerTest < ActiveSupport::TestCase
  WebpackerHelpers.when_webpacker_available do
    setup do
      WebpackerHelpers.clear_webpacker_packs
    end

    def test_it_loads_js_from_the_webpacker_container
      WebpackerHelpers.compile
      container = React::ServerRendering::SeparateServerBundleContainer.new

      assert_not_empty container.find_asset("server_rendering.js")
    end
  end
end
