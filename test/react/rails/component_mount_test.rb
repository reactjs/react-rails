require 'test_helper'

SprocketsHelpers.when_available do
  class ComponentMountTest < ActionDispatch::IntegrationTest
    compiled_once = false
    setup do
      if !compiled_once
        WebpackerHelpers.clear_webpacker_packs
        WebpackerHelpers.compile
      end
      @helper = React::Rails::ComponentMount.new
    end

    def test_react_component_accepts_React_props
      html = @helper.react_component('Foo', {bar: 'value'})
      expected_props = %w(data-react-class="Foo" data-react-props="{&quot;bar&quot;:&quot;value&quot;}")
      expected_props.each do |segment|
        assert html.include?(segment)
      end
    end

    def test_react_component_accepts_React_props_with_camelize_props
      React::Rails::ComponentMount.camelize_props_switch = true
      helper = React::Rails::ComponentMount.new
      html = helper.react_component('Foo', {foo_bar: 'value'})
      expected_props = %w(data-react-class="Foo" data-react-props="{&quot;fooBar&quot;:&quot;value&quot;}")
      expected_props.each do |segment|
        assert html.include?(segment)
      end
    end

    def test_react_component_allows_camelize_props_to_be_passed_in_as_an_option
      React::Rails::ComponentMount.camelize_props_switch = false
      helper = React::Rails::ComponentMount.new
      html = helper.react_component('Foo', {foo_bar: 'value'}, camelize_props: true)
      expected_props = %w(data-react-class="Foo" data-react-props="{&quot;fooBar&quot;:&quot;value&quot;}")
      expected_props.each do |segment|
        assert html.include?(segment)
      end

      React::Rails::ComponentMount.camelize_props_switch = true
      helper = React::Rails::ComponentMount.new
      html = helper.react_component('Foo', {foo_bar: 'value'}, camelize_props: false)
      expected_props = %w(data-react-class="Foo" data-react-props="{&quot;foo_bar&quot;:&quot;value&quot;}")
      expected_props.each do |segment|
        assert html.include?(segment)
      end
    end

    def test_react_component_accepts_React_props_with_camelize_props_containing_nested_arrays
      React::Rails::ComponentMount.camelize_props_switch = true
      helper = React::Rails::ComponentMount.new
      html = helper.react_component('Foo', {foo_bar: [{user_name: 'Ryan'}, {user_name: 'Matt'}], bar_foo: 1})
      expected_props = %w(data-react-class="Foo" data-react-props="{&quot;fooBar&quot;:[{&quot;userName&quot;:&quot;Ryan&quot;},{&quot;userName&quot;:&quot;Matt&quot;}],&quot;barFoo&quot;:1}")
      expected_props.each do |segment|
        assert html.include?(segment)
      end
    end

    def test_react_component_accepts_jbuilder_based_strings_as_properties
      jbuilder_json = Jbuilder.new do |json|
        json.bar 'value'
      end.target!

      html = @helper.react_component('Foo', jbuilder_json)
      expected_props = %w(data-react-class="Foo" data-react-props="{&quot;bar&quot;:&quot;value&quot;}")
      expected_props.each do |segment|
        assert html.include?(segment), "expected #{html} to include #{segment}"
      end
    end

    def test_react_component_accepts_string_props_with_prerender_true
      html = @helper.react_component('Todo', {todo: 'render on the server'}.to_json, prerender: true)
      assert(html.include?('data-react-class="Todo"'), "it includes attrs for UJS")
      assert(html.include?('>render on the server</li>'), "it includes rendered HTML")
      assert(html.include?('data-reactid'), "it includes React properties")
    end

    def test_react_component_passes_static_to_BundleRenderer
      html = @helper.react_component('Todo', {todo: 'render on the server'}.to_json, prerender: :static)
      assert(html.include?('>render on the server</li>'), "it includes rendered HTML")
      assert(!html.include?('data-reactid'), "it DOESNT INCLUDE React properties")
    end

    def test_react_component_does_not_include_HTML_properties_with_a_static_render
      html = @helper.react_component('Todo', {todo: 'render on the server'}.to_json, prerender: :static)
      assert_equal('<div><li>render on the server</li></div>', html)
    end

    def test_react_component_accepts_HTML_options_and_HTML_tag
      assert @helper.react_component('Foo', {}, :span).match(/<span\s.*><\/span>/)

      html = @helper.react_component('Foo', {}, {class: 'test', tag: :span, data: {foo: 1}})
      assert html.match(/<span\s.*><\/span>/)
      assert html.include?('class="test"')
      assert html.include?('data-foo="1"')
    end

    module DummyRenderer
      def self.render(component_name, props, prerender_options)
        "rendered #{component_name} with #{props.to_json}"
      end
    end

    module DummyController
      def self.react_rails_prerenderer
        DummyRenderer
      end
    end

    def test_it_uses_the_controllers_react_rails_prerenderer_if_available
      @helper.setup(DummyController)
      rendered_component = @helper.react_component('Foo', {"ok" => true}, prerender: :static)
      assert_equal %|<div>rendered Foo with {&quot;ok&quot;:true}</div>|, rendered_component
    end
  end
end
