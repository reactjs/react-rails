module React
  module Rails
    # Map to files provided by React::Source,
    # based on Rails application config.
    class AssetRegistry
      attr_reader :config
      def initialize(config:)
        @config = config
      end

      # Determine the React build based on Rails configs
      def react_source
        filename = 'react' +
          (config.react.addons ? '-with-addons' : '') +
          (config.react.variant == :production ? '.min.js' : '.js')
        React::Source.bundled_path_for(filename)
      end

      # JSXTransformer is always the same
      def jsx_transformer_source
        React::Source.bundled_path_for('JSXTransformer.js')
      end
    end
  end
end
