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
          next if args.empty?
          if react_separate_props?
            data[:react_props_id] = add_react_props args, options[:inline_props]
          else
            data[:react_props] = React::Renderer.react_props args
          end
        end
        html_tag = html_options[:tag] || :div
        
        # remove internally used properties so they aren't rendered to DOM
        html_options.except!(:tag, :prerender)

        result = content_tag(html_tag, '', html_options, &block)
        result += render_react_props html_options[:data][:react_props_id] if options[:inline_props] && react_separate_props?
        result
      end

      # Add properties for component and return element id.
      #
      def add_react_props(props={}, inline=false)
        return if props.empty?
        props_id = SecureRandom.base64
        content_key = "react_props"
        content_key += "_#{props_id}" if inline
        content_for content_key do
          content_tag :script, type: 'text/json', id: props_id do
            raw React::Renderer.react_props props
          end
        end
        props_id
      end

      # Render script tag with JSON props. Should be placed at the end of body
      # in order to speedup page rendering.
      #
      def render_react_props(element_id=nil)
        if react_separate_props?
          content_for("react_props_#{element_id}") || content_for('react_props')
        else
          nil
        end
      end

      def react_separate_props?
        ::Rails.configuration.react.separate_props
      end

    end
  end
end
