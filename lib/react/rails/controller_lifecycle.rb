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

      module ClassMethods
        # Call this in the controller to check out a prerender for the whole request.
        # You can access the renderer with {#react_rails_prerenderer}.
        def per_request_react_rails_prerenderer
          around_action_with_fallback = respond_to?(:around_action) ? :around_action : :around_filter
          public_send(around_action_with_fallback, :per_request_react_rails_prerenderer)
        end
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

      # If you want a per-request renderer, add this method as an around-action
      #
      # (`.per_request_react_rails_prerenderer` does this for you)
      # @example Having one renderer instance for each controller action
      #   around_action :per_request_react_rails_prerenderer
      def per_request_react_rails_prerenderer
        React::ServerRendering.with_renderer do |renderer|
          @__react_rails_prerenderer = renderer
          yield
        end
      end

      # An instance of a server renderer, for use during this request
      def react_rails_prerenderer
        @__react_rails_prerenderer
      end
    end
  end
end
