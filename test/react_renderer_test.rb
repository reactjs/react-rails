require 'test_helper'

class ReactRendererTest < ActiveSupport::TestCase

  test 'Server rendering class directly' do
    result = React::Renderer.render "TodoList", :todos => %w{todo1 todo2 todo3}
    assert_match /todo1.*todo2.*todo3/, result
    assert_match /data-react-checksum/, result
  end

  test 'Server rendering with an already-encoded json string' do
    json_string = Jbuilder.new do |json|
      json.todos %w{todo1 todo2 todo3}
    end.target!

    result = React::Renderer.render "TodoList", json_string
    assert_match /todo1.*todo2.*todo3/, result
    assert_match /data-react-checksum/, result
  end

  test 'Rendering does not throw an exception when console log api is used' do
    %W(error info log warn).each do |fn|
      assert_nothing_raised(ExecJS::ProgramError) do
        React::Renderer.pool.checkout.context.eval("console.#{fn}()")
      end
    end
  end

  test 'prerender errors are thrown' do
    err = assert_raises React::Renderer::PrerenderError do
      React::Renderer.render("NonexistentComponent", {error: true, exists: false})
    end
    expected_message_one = 'Encountered error "ReferenceError: Can\'t find variable: NonexistentComponent" when prerendering NonexistentComponent with {"error":true,"exists":false}'
    expected_message_two = 'Encountered error "ReferenceError: NonexistentComponent is not defined" when prerendering NonexistentComponent with {"error":true,"exists":false}'
    assert (expected_message_one == err.message || expected_message_two == err.message)
  end

  test 'prerender errors are thrown when given a string' do
    json_string = Jbuilder.new do |json|
      json.error true
      json.exists false
    end.target!

    err = assert_raises React::Renderer::PrerenderError do
      React::Renderer.render("NonexistentComponent", json_string)
    end
    expected_message_one = 'Encountered error "ReferenceError: Can\'t find variable: NonexistentComponent" when prerendering NonexistentComponent with {"error":true,"exists":false}'
    expected_message_two = 'Encountered error "ReferenceError: NonexistentComponent is not defined" when prerendering NonexistentComponent with {"error":true,"exists":false}'
    assert (expected_message_one == err.message || expected_message_two == err.message)
  end
end
