require 'babel/transpiler'
module React
  module JSX
    # A {React::JSX}-compliant transformer which uses `Babel::Transpiler` to transform JSX.
    class BabelTransformer
      DEPRECATED_OPTIONS = [:harmony, :strip_types, :asset_path]
      DEFAULT_TRANSFORM_OPTIONS = { blacklist: ['spec.functionName', 'validation.react', 'strict'] }

      def initialize(options)
        return @transform_options_proc = options if options.respond_to?(:call)

        if (options.keys & DEPRECATED_OPTIONS).any?
          ActiveSupport::Deprecation.warn("Setting config.react.jsx_transform_options for :harmony, :strip_types, and :asset_path keys is now deprecated and has no effect with the default Babel Transformer."+
                                              "Please use new Babel Transformer options :whitelist, :plugin instead.")
        end

        @transform_options = DEFAULT_TRANSFORM_OPTIONS.merge(options)
      end

      def transform(code)
        Babel::Transpiler.transform(code, @transform_options)['code']
      end

      def transform_with_proc_options(input)
        options = DEFAULT_TRANSFORM_OPTIONS.merge(@transform_options_proc.call(input))
        Babel::Transpiler.transform(input[:data], options)['code']
      end
    end
  end
end
