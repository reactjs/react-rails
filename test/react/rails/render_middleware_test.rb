require 'test_helper'

# This helper implementation just counts the number of
# calls to `react_component`
class DummyHelperImplementation
  attr_reader :counter
  def initialize
    @counter = 0
  end

  def react_component(*args)
    @counter += 1
  end
end

class RenderMiddlewareTest < ActionDispatch::IntegrationTest
  impl_key = React::Rails::RenderMiddleware::HELPER_IMPLEMENTATION_KEY

  def setup
    @previous_helper_implementation = React::Rails::ViewHelper.helper_implementation_class
    React::Rails::ViewHelper.helper_implementation_class = DummyHelperImplementation
  end

  def teardown
    React::Rails::ViewHelper.helper_implementation_class = @previous_helper_implementation
  end

  test "it creates a helper object and puts it in the request env" do
    get '/pages/1'
    helper_obj = request.env[impl_key]
    assert(helper_obj.is_a?(DummyHelperImplementation), "It uses the view helper implementation class")
    assert_equal(1, helper_obj.counter, "It uses that object during rendering")
  end

  test "there's a new helper object for every request" do
    get '/pages/1'
    first_helper = request.env[impl_key]
    get '/pages/1'
    second_helper = request.env[impl_key]
    assert(first_helper != second_helper, "The helper for the second request is brand new")
  end
end
