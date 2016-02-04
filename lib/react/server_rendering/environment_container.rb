module React
  module ServerRendering
    # Return asset contents by getting them from a Sprockets::Environment instance.
    #
    # This is good for Rails development but bad for production because:
    # - It compiles the asset lazily, not ahead-of-time
    # - Rails 5 / Sprockets 3 doesn't expose a Sprockets::Environment in production.
    class EnvironmentContainer
      def initialize
        @environment = ::Rails.application.assets
      end

      def find_asset(logical_path)
        @environment[logical_path].to_s
      end
    end
  end
end
