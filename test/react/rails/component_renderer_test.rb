# frozen_string_literal: true

require "test_helper"

class ComponentRendererController < ActionController::Base
  append_view_path File.expand_path("../../dummy/app/views", __dir__)
  layout "application"

  def default_layout
    render component: "TodoList"
  end

  def explicit_layout_false
    render component: "TodoList", layout: false
  end

  def explicit_named_layout
    render component: "TodoList", layout: "app_no_turbolinks"
  end
end

class ComponentRendererTest < ActionController::TestCase
  tests ComponentRendererController

  FakeRenderer = Struct.new(:html, :calls) do
    def initialize(html)
      super(html, [])
    end

    def call(component_name, options)
      calls << [component_name, options]
      html
    end
  end

  setup do
    @routes = ActionDispatch::Routing::RouteSet.new
    @routes.draw do
      get "default_layout", to: "component_renderer#default_layout"
      get "explicit_layout_false", to: "component_renderer#explicit_layout_false"
      get "explicit_named_layout", to: "component_renderer#explicit_named_layout"
    end
  end

  test "render component uses the current layout by default" do # rubocop:disable Minitest/MultipleAssertions
    fake_renderer = FakeRenderer.new("<main>SSR</main>")

    React::Rails::ControllerRenderer.stub(:new, ->(*) { fake_renderer }) do
      get :default_layout
    end

    assert_response :success
    assert_match(%r{<title>Dummy</title>}, response.body)
    assert_match(%r{<main>SSR</main>}, response.body)
    assert_equal "TodoList", fake_renderer.calls.dig(0, 0)
  end

  test "render component preserves explicit layout false" do # rubocop:disable Minitest/MultipleAssertions
    fake_renderer = FakeRenderer.new("<main>SSR</main>")

    React::Rails::ControllerRenderer.stub(:new, ->(*) { fake_renderer }) do
      get :explicit_layout_false
    end

    assert_response :success
    assert_no_match(%r{<title>Dummy</title>}, response.body)
    assert_match(%r{<main>SSR</main>}, response.body)
    assert_equal "TodoList", fake_renderer.calls.dig(0, 0)
  end

  test "render component preserves a named layout override" do # rubocop:disable Minitest/MultipleAssertions
    fake_renderer = FakeRenderer.new("<main>SSR</main>")

    React::Rails::ControllerRenderer.stub(:new, ->(*) { fake_renderer }) do
      get :explicit_named_layout
    end

    assert_response :success
    assert_match(/app_no_turbolinks/, response.body)
    assert_match(%r{<main>SSR</main>}, response.body)
    assert_equal "TodoList", fake_renderer.calls.dig(0, 0)
  end
end
