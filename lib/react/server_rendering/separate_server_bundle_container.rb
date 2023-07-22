# frozen_string_literal: true

require "open-uri"

module React
  module ServerRendering
    # Get a compiled file from Shakapacker's output path
    class SeparateServerBundleContainer
      def self.compatible?
        !!defined?(Shakapacker)
      end

      def find_asset(filename)
        asset_path = Shakapacker.config.public_output_path.join(filename).to_s
        File.read(asset_path)
      end
    end
  end
end
