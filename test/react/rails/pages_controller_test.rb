# frozen_string_literal: true

require "test_helper"

class PagesControllerTest < ActionController::TestCase
  include ParamsHelper
  setup do
    ShakapackerHelpers.compile_if_missing
  end

  test "renders successfully" do
    get :show, params: { id: 1 }

    assert_equal(200, response.status)
  end

  when_stateful_js_context_available do
    test "it sets up and tears down a react context" do
      get :show, params: { id: 1, prerender: true }

      assert_includes(response.body, "Hello")
    end

    test "it sets up and tears down a react context with the given greeting text" do
      get :show, params: { id: 1, prerender: true, greeting: "Howdy" }

      assert_includes(response.body, "Howdy")
    end

    test "it sets up and tears down a react context with the given greeting emoji" do
      get :show, params: { id: 1, prerender: true, greeting: "👋" }

      assert_includes(response.body, "👋")
    end
  end
end
