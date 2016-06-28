require 'test_helper'

when_sprockets_available do
  class ComponentMountTest < ActionDispatch::IntegrationTest
    setup do
      @helper = React::Rails::ComponentMount.new
    end

    test '#react_component accepts React props' do
      html = @helper.react_component('Foo', {bar: 'value'})
      expected_props = %w(data-react-class="Foo" data-react-props="{&quot;bar&quot;:&quot;value&quot;}")
      expected_props.each do |segment|
        assert html.include?(segment)
      end
    end

    test '#react_component accepts React props with camelize_props' do
      React::Rails::ComponentMount.camelize_props_switch = true
      helper = React::Rails::ComponentMount.new
      html = helper.react_component('Foo', {foo_bar: 'value'})
      expected_props = %w(data-react-class="Foo" data-react-props="{&quot;fooBar&quot;:&quot;value&quot;}")
      expected_props.each do |segment|
        assert html.include?(segment)
      end
    end

    test '#react_component allows camelize_props to be passed in as an option' do
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

    test '#react_component accepts React props with camelize_props containing nested arrays' do
      React::Rails::ComponentMount.camelize_props_switch = true
      helper = React::Rails::ComponentMount.new
      html = helper.react_component('Foo', {foo_bar: [{user_name: 'Ryan'}, {user_name: 'Matt'}], bar_foo: 1})
      expected_props = %w(data-react-class="Foo" data-react-props="{&quot;fooBar&quot;:[{&quot;userName&quot;:&quot;Ryan&quot;},{&quot;userName&quot;:&quot;Matt&quot;}],&quot;barFoo&quot;:1}")
      expected_props.each do |segment|
        assert html.include?(segment)
      end
    end

    test '#react_component accepts jbuilder-based strings as properties' do
      jbuilder_json = Jbuilder.new do |json|
        json.bar 'value'
      end.target!

      html = @helper.react_component('Foo', jbuilder_json)
      expected_props = %w(data-react-class="Foo" data-react-props="{&quot;bar&quot;:&quot;value&quot;}")
      expected_props.each do |segment|
        assert html.include?(segment), "expected #{html} to include #{segment}"
      end
    end

    test '#react_component accepts string props with prerender: true' do
      html = @helper.react_component('Todo', {todo: 'render on the server'}.to_json, prerender: true)
      assert(html.include?('data-react-class="Todo"'), "it includes attrs for UJS")
      assert(html.include?('>render on the server</li>'), "it includes rendered HTML")
      assert(html.include?('data-reactid'), "it includes React properties")
    end

    test '#react_component passes :static to SprocketsRenderer' do
      html = @helper.react_component('Todo', {todo: 'render on the server'}.to_json, prerender: :static)
      assert(html.include?('>render on the server</li>'), "it includes rendered HTML")
      assert(!html.include?('data-reactid'), "it DOESNT INCLUDE React properties")
    end

    test '#react_component does not include HTML properties with a static render' do
      html = @helper.react_component('Todo', {todo: 'render on the server'}.to_json, prerender: :static)
      assert_equal('<div><li>render on the server</li></div>', html)
    end

    test '#react_component accepts HTML options and HTML tag' do
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
      def self.__prerenderer
        DummyRenderer
      end
    end

    test "it uses the controller's __prerenderer, if available" do
      @helper.setup(DummyController)
      rendered_component = @helper.react_component('Foo', {"ok" => true}, prerender: :static)
      assert_equal %|<div>rendered Foo with {&quot;ok&quot;:true}</div>|, rendered_component
    end
  end
end
