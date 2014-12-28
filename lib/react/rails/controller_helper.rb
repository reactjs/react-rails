module React
  module Rails
    module ControllerHelper

      # Render a React component as the view instead of
      # a template from the app/views folder.
      #
      def render_react_component(*args, &block)
        current_layout = _layout.virtual_path
        @__react_component_args = args
        @__react_component_block = block

        render inline: '<%= react_component(*@__react_component_args, &@__react_component_block) %>', layout: current_layout
      end

    end
  end
end
