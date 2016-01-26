module React
  module Rails
    module ControllerLifecycle
      extend ActiveSupport::Concern

      included do
        # use both names to support Rails 3..5
        before_action_with_fallback = begin method(:before_action); rescue method(:before_filter); end
        after_action_with_fallback = begin method(:after_action); rescue method(:after_filter); end
        before_action_with_fallback.call :setup_react_component_helper
        after_action_with_fallback.call :teardown_react_component_helper
        attr_reader :__react_component_helper
      end

      def setup_react_component_helper
        new_helper = React::Rails::ViewHelper.helper_implementation_class.new
        new_helper.setup(self)
        @__react_component_helper = new_helper
      end

      def teardown_react_component_helper
        @__react_component_helper.teardown(self)
      end
    end
  end
end
