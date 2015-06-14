require 'babel/transpiler'
module React
  module JSX
    class BabelTransformer
      DEPRECATED_OPTIONS = [:harmony, :strip_types, :asset_path]
      DEFAULT_TRANSFORM_OPTIONS = { blacklist: ['spec.functionName', 'validation.react'] }
      def initialize(options)
        if (options.keys & DEPRECATED_OPTIONS).any?
          ActiveSupport::Deprecation.warn("Setting config.react.jsx_transform_options for :harmony, :strip_types, and :asset_path keys is now deprecated and has no effect with the default Babel Transformer."+
                                              "Please use new Babel Transformer options :whitelist, :plugin instead.")
        end

        DEFAULT_TRANSFORM_OPTIONS.merge(options)
      end

      def transform(code)
        Babel::Transpiler.transform(code)['code']
      end
    end
  end
end
