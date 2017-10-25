module React
  module Rails
    # This class accepts some options for which build you want, then exposes where you can find
    # them. In general, these paths should be added to the sprockets environment.
    class AssetVariant
      GEM_ROOT = Pathname.new('../../../../').expand_path(__FILE__)
      # @return [String] "production" or "development"
      attr_reader :react_build

      # @return [String] The path which contains the specified React.js build as "react.js"
      attr_reader :react_directory

      # @return [String] The path which contains the JSX Transformer
      attr_reader :jsx_directory

      # @param [Hash] Options for the asset variant
      # @option variant [Symbol] if `:production`, use the minified React.js build
      def initialize(options={})

        @react_build = options[:variant] == :production ? 'production' : 'development'

        @react_directory = GEM_ROOT.join('lib/assets/react-source/').join(@react_build).to_s
        @jsx_directory =   GEM_ROOT.join('lib/assets/javascripts/').to_s
      end
    end
  end
end
