require 'test_helper'

class SprocketsRendererTest < ActiveSupport::TestCase
  setup do
    @renderer = React::ServerRendering::SprocketsRenderer.new({})
  end

  test '#render returns HTML' do
    result = @renderer.render("Todo", {todo: "write tests"})
    # skip reactid & checksum:
    assert_match(/<li.*write tests<\/li>/, result)
  end
end