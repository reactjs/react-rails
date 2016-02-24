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

      # ControllerLifecycle calls these hooks
      # You can use them in custom helper implementations
      def setup(env)
      end

      def teardown(env)
      end

      # Render a UJS-type HTML tag annotated with data attributes, which
      # are used by react_ujs to actually instantiate the React component
      # on the client.
      def react_component(name, props = {}, options = {}, &block)
        options = {:tag => options} if options.is_a?(Symbol)
        props = camelize_props_key(props) if camelize_props_switch

        prerender_options = options[:prerender]
        if prerender_options
          block = Proc.new{ concat React::ServerRendering.render(name, props, prerender_options) }
        end

        html_options = options.reverse_merge(:data => {})
        html_options[:data].tap do |data|
          data[:react_class] = name
          data[:react_props] = (props.is_a?(String) ? props : props.to_json)
        end
        html_tag = html_options[:tag] || :div

        # remove internally used properties so they aren't rendered to DOM
        html_options.except!(:tag, :prerender)

        content_tag(html_tag, '', html_options, &block)
      end

      private

      def camelize_props_key(props)
        return props unless props.is_a?(Hash)
        props.inject({}) do |h, (k,v)|
          h[k.to_s.camelize(:lower)] = case v
          when Hash
            camelize_props_key(v)
          when Array
            v.map {|i| camelize_props_key(i) }
          else
            v
          end
          h
        end
      end
    end
  end
end