module React
  module ServerRendering
    # Get asset content by reading the compiled file from disk using the generated manifest.yml file
    #
    # This is good for Rails production when assets are compiled to public/assets
    # but sometimes, they're compiled to other directories (or other servers)
    class YamlManifestContainer
      def initialize
        @assets = YAML.load_file(public_asset_path('manifest.yml'))
      end

      def find_asset(logical_path)
        asset_path = @assets[logical_path] || raise("No compiled asset for #{logical_path}, was it precompiled?")
        File.read(public_asset_path(asset_path))
      end

      def self.compatible?
        ::Rails::VERSION::MAJOR == 3
      end

      private

      def public_asset_path(asset_name)
        asset_path = File.join('public', ::Rails.application.config.assets.prefix, asset_name)
        ::Rails.root.join(asset_path)
      end
    end
  end
end
