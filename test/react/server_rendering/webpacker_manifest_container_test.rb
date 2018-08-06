require 'test_helper'
require 'open-uri'

WebpackerHelpers.when_webpacker_available do
  class WebpackerManifestContainerTest < ActiveSupport::TestCase
    setup do
      WebpackerHelpers.clear_webpacker_packs
    end

    def test_it_loads_JS_from_the_webpacker_container
      WebpackerHelpers.compile
      container = React::ServerRendering::WebpackerManifestContainer.new
      assert_not_empty container.find_asset('application.js')
    end

    def test_it_loads_from_webpack_dev_server
      WebpackerHelpers.with_dev_server do
        container = React::ServerRendering::WebpackerManifestContainer.new
        assert_not_empty container.find_asset('application.js')
      end
    end
  end
end
