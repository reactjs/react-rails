# frozen_string_literal: true

require "test_helper"
require "open-uri"

class ShakapackerManifestContainerTest < ActiveSupport::TestCase
  ShakapackerHelpers.when_shakapacker_available do
    setup do
      ShakapackerHelpers.clear_shakapacker_packs
    end

    def test_it_loads_js_from_the_shakapacker_container
      ShakapackerHelpers.compile
      container = React::ServerRendering::SeparateServerBundleContainer.new

      assert_not_empty container.find_asset("server_rendering.js")
    end
  end
end
