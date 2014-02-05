require 'test_helper'

class ReactRendererTest < ActiveSupport::TestCase

  test 'Server rendering class directly' do
    result = React::Renderer.render "TodoList", :todos => %w{todo1 todo2 todo3}
    assert_match /todo1.*todo2.*todo3/, result
    assert_match /data-react-checksum/, result
  end

end
