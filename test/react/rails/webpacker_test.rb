# frozen_string_literal: true

require "test_helper"

class ReactRailsWebpackerTest < ActionDispatch::IntegrationTest
  WebpackerHelpers.when_webpacker_available do
    include Capybara::DSL

    setup do
      Capybara.current_driver = Capybara.javascript_driver
      WebpackerHelpers.compile
      React::ServerRendering.reset_pool
    end

    teardown do
      WebpackerHelpers.clear_webpacker_packs
    end

    test "it mounts components from the pack" do # rubocop:disable Minitest/MultipleAssertions
      visit "/pack_component"

      assert page.has_content?("Export Default")
      assert page.has_content?("Named Export")
      assert page.has_content?("Exports")
      assert page.has_content?("Global Component")
    end
  end
end
