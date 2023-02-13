require 'open-uri'

module React
  module ServerRendering
    # Get a compiled file from Webpacker's output path
    class SeparateServerBundleContainer

      begin
        MAJOR, MINOR, PATCH, _ = Bundler.locked_gems.specs.find { |gem_spec| gem_spec.name == 'webpacker' || gem_spec.name == 'shakapacker' }.version.segments
      rescue
        MAJOR, MINOR, PATCH, _ = [0,0,0]
      end

      def self.compatible?
        !!defined?(Webpacker)
      end

      def find_asset(filename)
          asset_path = ::Rails.root.join(output_path, filename).to_s
          File.read(asset_path)
      end

      if MAJOR < 3
        def config
          Webpacker::Configuration
        end
      else
        def config
          Webpacker.config
        end
      end

      def output_path
        # Webpack1 /:output/:entry, Webpack3 /public/:output
        config.respond_to?(:output_path) ? config.output_path : 'public'
      end
    end
  end
end
