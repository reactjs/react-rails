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
end
