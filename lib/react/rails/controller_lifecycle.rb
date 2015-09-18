module React
  module Rails
    module ControllerLifecycle
      extend ActiveSupport::Concern

      included do
        before_action :setup_react_component_helper
        after_action :teardown_react_component_helper
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
