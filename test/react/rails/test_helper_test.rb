# frozen_string_literal: true

require "test_helper"

class TestHelperTest < ActionDispatch::IntegrationTest
  setup do
    ShakapackerHelpers.compile_if_missing
  end

  test "assert_react_component" do # rubocop:disable Minitest/MultipleAssertions
    get "/pages/1"

    assert_equal 200, response.status
    assert_react_component "GreetingMessage"
    assert_react_component "GreetingMessage" do |props|
      assert_equal "Bob", props[:name]
      assert_equal "Last Bob", props[:lastName]
      assert_equal "Bob", props[:info][:name]
      assert_equal "Last Bob", props[:info][:lastName]

      assert_select "[id=?]", "component"
      assert_select "[class=?]", "greeting-message"
    end
    assert_react_component "Todo" do |props|
      assert_equal "Another Component", props[:todo]
    end
  end
end
