module React
  module Rails
    class AssetVariant
      GEM_ROOT = Pathname.new('../../../../').expand_path(__FILE__)
      attr_reader :react_build, :react_directory, :jsx_directory

      def initialize(options={})
        # We want to include different files in dev/prod. The development builds
        # contain console logging for invariants and logging to help catch
        # common mistakes. These are all stripped out in the production build.
        @react_build = options[:variant] == :production ? 'production' : 'development'
        options[:addons] && @react_build += '-with-addons'

        @react_directory = GEM_ROOT.join('lib/assets/react-source/').join(@react_build).to_s
        @jsx_directory =   GEM_ROOT.join('lib/assets/javascripts/').to_s
      end
    end
  end
end
