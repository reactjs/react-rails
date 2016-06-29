module React
  module Rails
    # This module is included into ActionController so that
    # per-request hooks can be called in the view helper.
    module ControllerLifecycle
      extend ActiveSupport::Concern

      included do
        # use both names to support Rails 3..5
        around_action_with_fallback = respond_to?(:around_action) ? :around_action : :around_filter
        public_send(around_action_with_fallback, :use_react_component_helper)
        attr_reader :__react_component_helper
      end

      # Instantiate the ViewHelper implementation and call its #setup method
      # then let the controller action run,
      # then call the ViewHelper implementation's #teardown method
      def use_react_component_helper
        new_helper = React::Rails::ViewHelper.helper_implementation_class.new
        new_helper.setup(self)
        @__react_component_helper = new_helper
        yield
        @__react_component_helper.teardown(self)
      end
    end
  end
end
