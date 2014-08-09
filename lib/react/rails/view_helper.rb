module React
  module Rails
    module ViewHelper

      # Render a UJS-type HTML tag annotated with data attributes, which
      # are used by react_ujs to actually instantiate the React component
      # on the client.
      #
      def react_component(name, args = {}, options = {}, &block)
        args = camelize_args(args) if ::Rails.configuration.react.camelize_props
        options = {:tag => options} if options.is_a?(Symbol)
        block = Proc.new{concat React::Renderer.render(name, args)} if options[:prerender] == true

        html_options = options.reverse_merge(:data => {})
        html_options[:data].tap do |data|
          data[:react_class] = name
          data[:react_props] = args.to_json unless args.empty?
        end
        html_tag = html_options.delete(:tag) || :div

        content_tag(html_tag, '', html_options, &block)
      end

      private

      def camelize_args(args)
        mapped_array = args.map do |key, value|
          value = camelize_args(value) if value.is_a?(Hash)
          [key.to_s.camelize(:lower).to_sym, value]
        end

        Hash[mapped_array]
      end

    end
  end
end
