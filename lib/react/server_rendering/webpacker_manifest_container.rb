module React
  module ServerRendering
    # Get a compiled file from Webpacker
    class WebpackerManifestContainer
      def find_asset(logical_path)
        asset_path = Webpacker::Manifest.lookup(logical_path) # raises if not found
        full_path = File.join(
          # TODO: using `.parent` here won't work for nonstandard configurations
          Webpacker::Configuration.output_path.parent,
          asset_path
        )
        # TODO: webpacker-dev-server points these at localhost:8080
        File.read(full_path)
      end

      def self.compatible?
        defined?(Webpacker)
      end
    end
  end
end
