require 'test_helper'

# This helper implementation just counts the number of
# calls to `react_component`
class DummyHelperImplementation
  attr_reader :events

  def initialize
    @events = []
  end

  def setup(controller)
    @events << (controller.params["param_test"] || :setup)
  end

  def teardown(env)
    @events << :teardown
  end

  def react_component(*args)
    @events << :react_component
  end
end

class ControllerLifecycleTest < ActionDispatch::IntegrationTest
  compiled = false
  setup do
    if !compiled
      compile = true
      WebpackerHelpers.compile
    end
    @previous_helper_implementation = React::Rails::ViewHelper.helper_implementation_class
    React::Rails::ViewHelper.helper_implementation_class = DummyHelperImplementation
  end

  def teardown
    React::Rails::ViewHelper.helper_implementation_class = @previous_helper_implementation
  end

  def test_it_creates_a_helper_object_and_puts_it_in_the_request_env
    get '/pages/1'
    helper_obj = controller.__react_component_helper
    assert(helper_obj.is_a?(DummyHelperImplementation), "It uses the view helper implementation class")
  end

  def test_it_calls_setup_and_teardown_methods
    get '/pages/1?param_test=123'
    helper_obj = controller.__react_component_helper
    lifecycle_steps = ["123", :react_component, :react_component, :teardown]
    assert_equal(lifecycle_steps, helper_obj.events)
  end

  def test_theres_a_new_helper_object_for_every_request
    get '/pages/1'
    first_helper = controller.__react_component_helper
    get '/pages/1'
    second_helper = controller.__react_component_helper
    assert(first_helper != second_helper, "The helper for the second request is brand new")
  end
end
