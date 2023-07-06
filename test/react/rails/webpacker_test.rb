# frozen_string_literal: true

require "test_helper"

class ReactRailsShakapackerTest < ActionDispatch::IntegrationTest
  ShakapackerHelpers.when_shakapacker_available do
    include Capybara::DSL

    setup do
      Capybara.current_driver = Capybara.javascript_driver
      ShakapackerHelpers.compile
      React::ServerRendering.reset_pool
    end

    teardown do
      ShakapackerHelpers.clear_shakapacker_packs
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
