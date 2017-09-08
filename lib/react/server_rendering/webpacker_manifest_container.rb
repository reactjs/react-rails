require "open-uri"

module React
  module ServerRendering
    # Get a compiled file from Webpacker. It may come from:
    #
    # - webpack-dev-server
    # - compiled pack
    class WebpackerManifestContainer
      # This pattern matches the code that initializes the dev-server client.
      CLIENT_REQUIRE = %r{__webpack_require__\(.*webpack-dev-server\/client\/index\.js.*\n}

      def find_asset(logical_path)
        # raises if not found
        asset_path = manifest.lookup(logical_path).to_s
        if asset_path.start_with?("http")
          # Get a file from the webpack-dev-server
          dev_server_asset = open(asset_path).read
          # Remove `webpack-dev-server/client/index.js` code which causes ExecJS to 💥
          dev_server_asset.sub!(CLIENT_REQUIRE, '//\0')
          dev_server_asset
        else
          # Read the already-compiled pack:
          full_path = file_path(logical_path).to_s
          File.read(full_path)
        end
      end

      def manifest
        Webpacker.respond_to?(:manifest) ? Webpacker.manifest : Webpacker::Manifest
      end

      def file_path path
        manifest.respond_to?(:lookup_path) ? manifest.lookup_path(path) : File.join(output_path, manifest.lookup(path).split('/')[2..-1])
      end

      def config
        Webpacker.respond_to?(:config) ? Webpacker.config : Webpacker::Configuration
      end

      def output_path
        # Webpack1 /:output/:entry, Webpack3 /public/:output
        config.respond_to?(:output_path) ? config.output_path : 'public'
      end

      def self.compatible?
        !!defined?(Webpacker)
      end
    end
  end
end
