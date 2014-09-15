require 'test_helper'

class ReactRendererTest < ActiveSupport::TestCase

  test 'Server rendering class directly' do
    result = React::Renderer.render "TodoList", :todos => %w{todo1 todo2 todo3}
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
    expected_message = 'Encountered error "ReferenceError: NonexistentComponent is not defined" when prerendering NonexistentComponent with {"error":true,"exists":false}'
    assert_equal expected_message, err.message
  end
end
