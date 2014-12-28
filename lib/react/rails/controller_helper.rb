module React
  module Rails
    module ControllerHelper

      # Render a React component as the view instead of
      # a template from the app/views folder.
      #
      def render_react_component(name, args = {}, options = {}, &block)
        __react_render_component_args = {
          inline: '<%= react_component(*@__react_component_args, &@__react_component_block) %>',
          layout: options.delete(:layout) || _layout.virtual_path
        }

        if status = options.delete(:status)
          __react_render_component_args.merge!(status: status)
        end

        @__react_component_args = [name, args, options]
        @__react_component_block = block

        render __react_render_component_args
      end

    end
  end
end
