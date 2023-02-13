require 'open-uri'

module React
  module ServerRendering
    # Get a compiled file from Webpacker's output path
    class SeparateServerBundleContainer

      def self.compatible?
        !!defined?(Webpacker)
      end

      def find_asset(filename)
          asset_path = Webpacker.config.public_output_path.join(filename).to_s
          File.read(asset_path)
      end
    end
  end
end
