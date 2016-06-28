module React
  module Rails
    # This module is included into ActionController so that
    # per-request hooks can be called in the view helper.
    module ControllerLifecycle
      extend ActiveSupport::Concern

      included do
        # use both names to support Rails 3..5
        before_action_with_fallback = respond_to?(:before_action) ? :before_action : :before_filter
        after_action_with_fallback = respond_to?(:after_action) ? :after_action : :after_filter
        public_send(before_action_with_fallback, :setup_react_component_helper)
        public_send(after_action_with_fallback, :teardown_react_component_helper)
        attr_reader :__react_component_helper
      end

      # Instantiate the ViewHelper implementation and call its #setup method
      def setup_react_component_helper
        new_helper = React::Rails::ViewHelper.helper_implementation_class.new
        new_helper.setup(self)
        @__react_component_helper = new_helper
      end

      # Call the ViewHelper implementation's #teardown method
      def teardown_react_component_helper
        @__react_component_helper.teardown(self)
      end
    end
  end
end
