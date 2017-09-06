require 'test_helper'

WebpackerHelpers.when_webpacker_available do
  class ReactRailsWebpackerTest < ActionDispatch::IntegrationTest
    include Capybara::DSL

    setup do
      Capybara.current_driver = Capybara.javascript_driver
      WebpackerHelpers.compile
      React::ServerRendering.reset_pool
    end

    teardown do
      WebpackerHelpers.clear_webpacker_packs
    end

    def test_it_mounts_components_from_the_pack
      visit '/pack_component'
      assert page.has_content?('Export Default')
      assert page.has_content?('Named Export')
      assert page.has_content?('Exports')
      assert page.has_content?('Global Component')
    end
  end
end
