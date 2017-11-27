module React
  module Rails
    # This is the default view helper implementation.
    # It just inserts HTML into the DOM (see {#react_component}).
    #
    # You can extend this class or provide your own implementation
    # by assigning it to `config.react.view_helper_implementation`.
    class ComponentMount
      include ActionView::Helpers::TagHelper
      include ActionView::Helpers::TextHelper
      attr_accessor :output_buffer
      mattr_accessor :camelize_props_switch

      # {ControllerLifecycle} calls these hooks
      # You can use them in custom helper implementations
      def setup(controller)
        @controller = controller
      end

      def teardown(controller)
      end

      # Render a UJS-type HTML tag annotated with data attributes, which
      # are used by react_ujs to actually instantiate the React component
      # on the client.
      def react_component(name, props = {}, options = {}, &block)
        options = { :tag => options } if options.is_a?(Symbol)
        if options.fetch(:camelize_props, camelize_props_switch)
          props = React.camelize_props(props)
        end

        prerender_options = options[:prerender]
        if prerender_options
          block = Proc.new{ concat(prerender_component(name, props, prerender_options)) }
        end

        html_options = options.reverse_merge(:data => {})
        unless prerender_options == :static
          html_options[:data].tap do |data|
            data[:react_class] = name
            data[:react_props] = (props.is_a?(String) ? props : props.to_json)
            data[:hydrate] = 't' if prerender_options
          end
        end
        html_tag = html_options[:tag] || :div

        # remove internally used properties so they aren't rendered to DOM
        html_options.except!(:tag, :prerender, :camelize_props)

        rendered_tag = content_tag(html_tag, '', html_options, &block)
        if React::ServerRendering.renderer_options[:replay_console]
          # Grab the server-rendered console replay script
          # and move it _outside_ the container div
          rendered_tag.sub!(/\n(<script class="react-rails-console-replay">.*<\/script>)<\/(\w+)>$/m,'</\2>\1')
          rendered_tag.html_safe
        else
          rendered_tag
        end
      end

      private

      # If this controller has checked out a renderer, use that one.
      # Otherwise, use {React::ServerRendering} directly (which will check one out for this rendering).
      def prerender_component(component_name, props, prerender_options)
        renderer = @controller.try(:react_rails_prerenderer) || React::ServerRendering
        renderer.render(component_name, props, prerender_options)
      end
    end
  end
end
