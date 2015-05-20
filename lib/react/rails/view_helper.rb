module React
  module Rails
    module ViewHelper
      # Render a UJS-type HTML tag annotated with data attributes, which
      # are used by react_ujs to actually instantiate the React component
      # on the client.
      def react_component(name, props = {}, options = {}, &block)
        options = {:tag => options} if options.is_a?(Symbol)

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
    end
  end
end
