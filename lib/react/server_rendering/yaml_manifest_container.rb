module React
  module ServerRendering
    # Get asset content by reading the compiled file from disk using the generated maniftest.yml file
    #
    # This is good for Rails production when assets are compiled to public/assets
    # but sometimes, they're compiled to other directories (or other servers)
    class YamlManifestContainer
      def initialize
        @assets = YAML.load_file(::Rails.root.join("public/assets/manifest.yml"))
      end

      def find_asset(logical_path)
        asset_path = @assets[logical_path] || raise("No compiled asset for #{logical_path}, was it precompiled?")
        asset_full_path = ::Rails.root.join("public", "assets", asset_path)
        File.read(asset_full_path)
      end
    end
  end
end
