require "open-uri"

module React
  module ServerRendering
    # Get a compiled file from Webpacker. It may come from:
    #
    # - webpack-dev-server
    # - compiled pack
    class WebpackerSingletonManifestContainer
      # This pattern matches the code that initializes the dev-server client.
      CLIENT_REQUIRE = %r{__webpack_require__\(.*webpack-dev-server\/client\/index\.js.*\n}

      def find_asset(logical_path)
        # raises if not found
        asset_path = Webpacker.manifest.lookup(logical_path).to_s
        if asset_path.start_with?("http")
          # Get a file from the webpack-dev-server
          dev_server_asset = open(asset_path).read
          # Remove `webpack-dev-server/client/index.js` code which causes ExecJS to 💥
          dev_server_asset.sub!(CLIENT_REQUIRE, '//\0')
          dev_server_asset
        else
          # Read the already-compiled pack:
          full_path = Webpacker.manifest.lookup_path(logical_path).to_s
          File.read(full_path)
        end
      end

      def self.compatible?
        !!(defined?(Webpacker) && Webpacker.respond_to?(:manifest))
      end
    end
  end
end
