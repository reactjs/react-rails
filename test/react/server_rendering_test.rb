require 'test_helper'

class NullRenderer
  def initialize(options)
    # in this case, options is actually a string (just for testing)
    @name = options
  end

  def render(component_name, props)
    "#{@name} rendered #{component_name} with #{props}"
  end
end

class ReactServerRenderingTest < ActiveSupport::TestCase
  setup do
    @previous_renderer = React::ServerRendering.renderer
    @previous_options = React::ServerRendering.renderer_options
    React::ServerRendering.renderer_options = "TEST"
    React::ServerRendering.renderer = NullRenderer
    React::ServerRendering.reset_pool
  end

  teardown do
    React::ServerRendering.renderer = @previous_renderer
    React::ServerRendering.renderer_options = @previous_options
  end

  test '.create_renderer makes a renderer with initialization options' do
    mock_renderer = Minitest::Mock.new
    mock_renderer.expect(:new, :fake_renderer, [{mock: true}])
    React::ServerRendering.renderer = mock_renderer
    React::ServerRendering.renderer_options = {mock: true}
    renderer = React::ServerRendering.create_renderer
    assert_equal(:fake_renderer, renderer)
  end

  test '.render returns a rendered string' do
    props = {"props" => true}
    result = React::ServerRendering.render("MyComponent", props)
    assert_equal("TEST rendered MyComponent with #{props}", result)
  end

  test '.reset_pool forgets old renderers' do
    # At first, they use the first options:
    assert_match(/^TEST/, React::ServerRendering.render(nil, nil))
    assert_match(/^TEST/, React::ServerRendering.render(nil, nil))

    # Then change the init options and clear the pool:
    React::ServerRendering.renderer_options = "DIFFERENT"
    React::ServerRendering.reset_pool
    # New renderers are created with the new init options:
    assert_match(/^DIFFERENT/, React::ServerRendering.render(nil, nil))
    assert_match(/^DIFFERENT/, React::ServerRendering.render(nil, nil))
  end
end