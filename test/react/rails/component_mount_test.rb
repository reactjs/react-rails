require 'test_helper'

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

  test '#react_component accepts HTML options and HTML tag' do
    assert @helper.react_component('Foo', {}, :span).match(/<span\s.*><\/span>/)

    html = @helper.react_component('Foo', {}, {class: 'test', tag: :span, data: {foo: 1}})
    assert html.match(/<span\s.*><\/span>/)
    assert html.include?('class="test"')
    assert html.include?('data-foo="1"')
  end
end
