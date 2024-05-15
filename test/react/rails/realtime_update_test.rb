# frozen_string_literal: true

require "test_helper"

class RealtimeUpdateTest < ActiveSupport::TestCase
  ShakapackerHelpers.when_shakapacker_available do
    include Capybara::DSL

    def assert_counter_count(page, timer_name, count)
      assert page.has_content?("#{timer_name} - #{count}"), <<~MSG
        #{page.body}
        #{page.driver.browser.logs.get(:browser).inspect}
      MSG
    end

    setup do
      Capybara.current_driver = Capybara.javascript_driver
      ShakapackerHelpers.compile
      React::ServerRendering.reset_pool
    end

    teardown do
      ShakapackerHelpers.clear_shakapacker_packs
    end

    test "doesn't re-mount the components trees when mountComponents is called" do
      visit "/counters"

      assert_counter_count(page, "Counter 1", 0)
      page.click_button "Increment Counter 1"
      page.click_button "Add counter"
      sleep 0.1

      assert_counter_count(page, "Counter 1", 1)
      assert_counter_count(page, "Counter 2", 0)
    end
  end
end
