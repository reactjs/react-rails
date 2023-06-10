# frozen_string_literal: true

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

      def initialize
        @cache_ids = []
      end

      # {ControllerLifecycle} calls these hooks
      # You can use them in custom helper implementations
      def setup(controller)
        @controller = controller
      end

      def teardown(controller); end

      # Render a UJS-type HTML tag annotated with data attributes, which
      # are used by react_ujs to actually instantiate the React component
      # on the client.
      def react_component(name, props = {}, options = {}, &block)
        options = { tag: options } if options.is_a?(Symbol)
        props = React.camelize_props(props) if options.fetch(:camelize_props, camelize_props_switch)

        prerender_options = options[:prerender]
        block = proc { concat(prerender_component(name, props, prerender_options)) } if prerender_options

        html_options = generate_html_options(name, options, props, prerender_options)

        rendered_tag(html_options, &block)
      end

      private

      # If this controller has checked out a renderer, use that one.
      # Otherwise, use {React::ServerRendering} directly (which will check one out for this rendering).
      def prerender_component(component_name, props, prerender_options)
        renderer = @controller.try(:react_rails_prerenderer) || React::ServerRendering
        renderer.render(component_name, props, prerender_options)
      end

      def generate_html_options(name, options, props, prerender_options)
        html_options = options.reverse_merge(data: {})

        unless prerender_options == :static
          html_options[:data].tap do |data|
            data[:react_class] = name
            data[:react_props] = (props.is_a?(String) ? props : props.to_json)
            data[:hydrate] = "t" if prerender_options

            num_components = @cache_ids.count { |c| c.start_with? name }
            data[:react_cache_id] = "#{name}-#{num_components}"
          end
        end

        html_options
      end

      def rendered_tag(html_options, &block)
        html_tag = html_options[:tag] || :div

        # remove internally used properties so they aren't rendered to DOM
        html_option_to_use = html_options.except(:tag, :prerender, :camelize_props)

        tag = content_tag(html_tag, "", html_option_to_use, &block)
        return tag unless React::ServerRendering.renderer_options[:replay_console]

        # Grab the server-rendered console replay script
        # and move it _outside_ the container div
        tag.sub!(%r{\n(<script class="react-rails-console-replay">.*</script>)</(\w+)>$}m, '</\2>\1')
        tag.html_safe
      end
    end
  end
end
