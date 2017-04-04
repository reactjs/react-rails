require 'test_helper'

WebpackerHelpers.when_webpacker_available do
  class ReactRailsWebpackerTest < ActionDispatch::IntegrationTest
    include Capybara::DSL

    setup do
      Capybara.current_driver = Capybara.javascript_driver
    end

    teardown do
      WebpackerHelpers.clear_webpacker_packs
    end

    test 'it mounts pages from the pack' do
      visit '/pack_component'
      assert page.has_content?('Export Default')
      assert page.has_content?('Named Export')
      assert page.has_content?('Exports')
    end
  end
end
