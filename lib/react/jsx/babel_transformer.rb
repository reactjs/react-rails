require 'babel/transpiler'
module React
  module JSX
    class BabelTransformer
      DEPRECATED_OPTIONS = [:harmony, :strip_types, :asset_path]

      def initialize(options)
        _options = options.dup
        has_old_opts = DEPRECATED_OPTIONS.map do |option|
          _options.delete option
        end.any?

        if has_old_opts
          ActiveSupport::Deprecation.warn("Setting config.react.jsx_transform_options for :harmony, :strip_types, and :asset_path keys is now deprecated and has no effect with the default Babel Transformer."+
                                              "Please use new Babel Transformer options :whitelist, :plugin instead.")
        end

        @transform_options = {
            blacklist: ['spec.functionName', 'validation.react']
        }.merge(_options)
      end

      def transform(code)
        puts @transform_options
        Babel::Transpiler.transform(code)['code']
      end
    end
  end
end
