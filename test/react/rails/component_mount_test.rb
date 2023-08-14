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
        ShakapackerHelpers.clear_shakapacker_packs
        ShakapackerHelpers.compile
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

    test "#react_component accepts HTML options and HTML tag" do # rubocop:disable Minitest/MultipleAssertions
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

    test "#react_component sets null props to undefined when null_to_undefined_props set to true" do
      app.config.react.null_to_undefined_props = true

      @helper.setup(DummyController)
      rendered_component = @helper.react_component("Foo", { bar: nil, content: 'bar":null,' })

      assert_includes rendered_component, '&quot;bar&quot;:undefined,&quot;content&quot;:&quot;bar\\&quot;:null,&quot;'
    end

    test "#react_component passes null props as null when null_to_undefined_props set to false" do
      app.config.react.null_to_undefined_props = false

      @helper.setup(DummyController)
      rendered_component = @helper.react_component("Foo", { bar: nil, content: 'bar":null,' })

      assert_includes rendered_component, "&quot;bar&quot;:null,&quot;content&quot;:&quot;bar\\&quot;:null,&quot;"
    end

    test "#props_to_json doesn't converts null values to undefined be default" do
      props = { name: nil }
      expected_json = '{"name":null}'
      component_mount = React::Rails::ComponentMount.new

      actual_json = component_mount.send(:props_to_json, props)

      assert_equal(expected_json, actual_json)
    end

    test "#props_to_json converts null values to undefined with null_to_undefined: true option" do
      props = { bar: nil, content: 'bar":null,' }
      expected_json = '{"bar":undefined,"content":"bar\\":null,"}'
      component_mount = React::Rails::ComponentMount.new

      actual_json = component_mount.send(:props_to_json, props, { null_to_undefined: true })

      assert_equal(expected_json, actual_json)
    end

    test "#props_to_json converts null values in arrays to undefined with null_to_undefined: true option" do
      props = { items1: [nil], items2: [1, nil], items3: [nil, 1], items4: [1, nil, 2] }
      expected_json = '{"items1":[undefined],"items2":[1,undefined],"items3":[undefined,1],"items4":[1,undefined,2]}'
      component_mount = React::Rails::ComponentMount.new

      actual_json = component_mount.send(:props_to_json, props, { null_to_undefined: true })

      assert_equal(expected_json, actual_json)
    end

    test "#props_to_json doesnt converts null-like values in arrays to undefined with null_to_undefined: true option" do
      props = {
        items1: "[null]",
        items2: "[1,null]",
        items3: "[null,1]",
        items4: "[1,null,2]",
        items5: '["a",null]',
        items6: '[null,"b"]',
        items7: '["a",null,"b"]',
        items8: '["a",nullx,"b"]'
      }
      expected_json = '{"items1":"[null]","items2":"[1,null]","items3":"[null,1]","items4":"[1,null,2]",' \
                      '"items5":"[\"a\",null]","items6":"[null,\"b\"]","items7":"[\"a\",null,\"b\"]"' \
                      ',"items8":"[\"a\",nullx,\"b\"]"}'
      component_mount = React::Rails::ComponentMount.new

      actual_json = component_mount.send(:props_to_json, props, { null_to_undefined: true })

      assert_equal(expected_json, actual_json)
    end

    test "#props_to_json doesnt converts null values in nested arrays to undefined with null_to_undefined: true" do
      props = {
        items1: nil,
        items2: [1, nil, 2],
        items3: nil,
        items4: "[1, null, 2]",
        items5: nil
      }
      expected_json = '{"items1":undefined,"items2":[1,undefined,2],"items3":undefined,"items4":"[1, null, 2]"' \
                      ',"items5":undefined}'
      component_mount = React::Rails::ComponentMount.new

      actual_json = component_mount.send(:props_to_json, props, { null_to_undefined: true })

      assert_equal(expected_json, actual_json)
    end
  end
end
