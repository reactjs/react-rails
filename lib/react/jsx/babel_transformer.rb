require 'babel/transpiler'
module React
  module JSX
    # A {React::JSX}-compliant transformer which uses `Babel::Transpiler` to transform JSX.
    class BabelTransformer
      DEPRECATED_OPTIONS = [:harmony, :strip_types, :asset_path]
      DEFAULT_TRANSFORM_OPTIONS = { blacklist: ['spec.functionName', 'validation.react', 'strict'] }

      def initialize(options)
        return unless options.is_a?(Hash)

        if (options.keys & DEPRECATED_OPTIONS).any?
          ActiveSupport::Deprecation.warn("Setting config.react.jsx_transform_options for :harmony, :strip_types, and :asset_path keys is now deprecated and has no effect with the default Babel Transformer."+
          "Please use new Babel Transformer options :whitelist, :plugin instead.")
        end
      end

      def transform(code, local_options = {})
        options = DEFAULT_TRANSFORM_OPTIONS.merge(local_options)
        Babel::Transpiler.transform(code, options)['code']
      end
    end
  end
end
