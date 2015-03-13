module React
  module Rails
    module ViewHelper

      # Render a UJS-type HTML tag annotated with data attributes, which
      # are used by react_ujs to actually instantiate the React component
      # on the client.
      #
      def react_component(name, args = {}, options = {}, &block)
        options = {:tag => options} if options.is_a?(Symbol)
        block = Proc.new{concat React::Renderer.render(name, args)} if options[:prerender]

        html_options = options.reverse_merge(:data => {})
        html_options[:data].tap do |data|
          data[:react_class] = name
          data[:react_props_id] = add_react_props args
        end
        html_tag = html_options[:tag] || :div
        
        # remove internally used properties so they aren't rendered to DOM
        html_options.except!(:tag, :prerender)
        
        content_tag(html_tag, '', html_options, &block)
      end

      # Add properties for component and return element id.
      #
      def add_react_props(props={})
        return if props.empty?
        props_id = SecureRandom.base64
        content_for :react_props do
          content_tag :script, type: 'text/json', id: props_id do
            raw React::Renderer.react_props props
          end
        end
        props_id
      end

      # Render script tag with JSON props. Should be placed at the end of body
      # in order to speedup page rendering.
      #
      def render_react_props
        content_for :react_props
      end

    end
  end
end
