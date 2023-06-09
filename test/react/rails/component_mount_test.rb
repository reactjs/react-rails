# frozen_string_literal: true

require "test_helper"

class ComponentMountTest < ActionDispatch::IntegrationTest
  module DummyRenderer
    def self.render(component_name, props, _prerender_options)
      "rendered #{component_name} with #{props.to_json}"
    end
  end

  module DummyController
    def self.react_rails_prerenderer
      DummyRenderer
    end
  end

  SprocketsHelpers.when_available do
    compiled_once = false
    setup do
      unless compiled_once
        WebpackerHelpers.clear_webpacker_packs
        WebpackerHelpers.compile
      end
      @helper = React::Rails::ComponentMount.new
    end

    test "#react_component accepts React props" do
      html = @helper.react_component("Foo", { bar: "value" })
      expected_props = %w[data-react-class="Foo" data-react-props="{&quot;bar&quot;:&quot;value&quot;}"]
      expected_props.each do |segment|
        assert_includes html, segment
      end
    end

    test "#react_component accepts React props with camelize_props" do
      React::Rails::ComponentMount.camelize_props_switch = true
      helper = React::Rails::ComponentMount.new
      html = helper.react_component("Foo", { foo_bar: "value" })
      expected_props = %w[data-react-class="Foo" data-react-props="{&quot;fooBar&quot;:&quot;value&quot;}"]
      expected_props.each do |segment|
        assert_includes html, segment
      end
    end

    test "#react_component allows camelize_props to be passed in as an option" do
      React::Rails::ComponentMount.camelize_props_switch = false
      helper = React::Rails::ComponentMount.new
      html = helper.react_component("Foo", { foo_bar: "value" }, camelize_props: true)
      expected_props = %w[data-react-class="Foo" data-react-props="{&quot;fooBar&quot;:&quot;value&quot;}"]
      expected_props.each do |segment|
        assert_includes html, segment
      end

      React::Rails::ComponentMount.camelize_props_switch = true
      helper = React::Rails::ComponentMount.new
      html = helper.react_component("Foo", { foo_bar: "value" }, camelize_props: false)
      expected_props = %w[data-react-class="Foo" data-react-props="{&quot;foo_bar&quot;:&quot;value&quot;}"]
      expected_props.each do |segment|
        assert_includes html, segment
      end
    end

    test "#react_component accepts React props with camelize_props containing nested arrays" do
      React::Rails::ComponentMount.camelize_props_switch = true
      helper = React::Rails::ComponentMount.new
      html = helper.react_component("Foo", { foo_bar: [{ user_name: "Ryan" }, { user_name: "Matt" }], bar_foo: 1 })
      # rubocop:disable Layout/LineLength
      expected_props = %w(
        data-react-class="Foo"
        data-react-props="{&quot;fooBar&quot;:[{&quot;userName&quot;:&quot;Ryan&quot;},{&quot;userName&quot;:&quot;Matt&quot;}],&quot;barFoo&quot;:1}"
      )
      # rubocop:enable Layout/LineLength
      expected_props.each do |segment|
        assert_includes html, segment
      end
    end

    test "#react_component accepts jbuilder-based strings as properties" do
      jbuilder_json = Jbuilder.new do |json|
        json.bar "value"
      end.target!

      html = @helper.react_component("Foo", jbuilder_json)
      expected_props = %w[data-react-class="Foo" data-react-props="{&quot;bar&quot;:&quot;value&quot;}"]
      expected_props.each do |segment|
        assert_includes html, segment, "expected #{html} to include #{segment}"
      end
    end

    test "#react_component accepts string props with prerender: true" do
      html = @helper.react_component("Todo", { todo: "render on the server" }.to_json, prerender: true)
      assert_includes(html, 'data-react-class="Todo"', "it includes attrs for UJS")
      assert_includes(html, ">render on the server</li>", "it includes rendered HTML")
    end

    test "#react_component passes :static to BundleRenderer" do
      html = @helper.react_component("Todo", { todo: "render on the server" }.to_json, prerender: :static)
      assert_includes(html, ">render on the server</li>", "it includes rendered HTML")
    end

    test "#react_component does not include HTML properties with a static render" do
      html = @helper.react_component("Todo", { todo: "render on the server" }.to_json, prerender: :static)
      assert_equal("<div><li>render on the server</li></div>", html)
    end

    test "#react_component accepts HTML options and HTML tag" do
      assert_match %r{<span\s.*></span>}, @helper.react_component("Foo", {}, :span)

      html = @helper.react_component("Foo", {}, { class: "test", tag: :span, data: { foo: 1 } })
      assert_match %r{<span\s.*></span>}, html
      assert_includes html, 'class="test"'
      assert_includes html, 'data-foo="1"'
    end

    test "it uses the controller's react_rails_prerenderer, if available" do
      @helper.setup(DummyController)
      rendered_component = @helper.react_component("Foo", { "ok" => true }, prerender: :static)
      assert_equal %(<div>rendered Foo with {&quot;ok&quot;:true}</div>), rendered_component
    end
  end
end
