require "test_helper"
require "open-uri"

WebpackerHelpers.when_webpacker_available do
  class WebpackerManifestContainerTest < ActiveSupport::TestCase
    setup do
      WebpackerHelpers.clear_webpacker_packs
    end

    test "it loads JS from the webpacker container" do
      WebpackerHelpers.compile
      container = React::ServerRendering::WebpackerManifestContainer.new
      js_file = container.find_asset("application.js")
      # Main file:
      assert_includes js_file, "ReactRailsUJS.loadContext(ctx)"
      # Bundled dependencies:
      assert_includes js_file, "ExportDefaultComponent"
    end

    def test_it_loads_from_webpack_dev_server
      webpack_dev_server = fork do
        Dir.chdir("test/dummy") do
          exec "RAILS_ENV=development ./bin/webpack-dev-server "
        end
      end

      detected_dev_server = false
      60.times do |i|
        begin
          # Make sure that the manifest has been updated:
          Webpacker::Manifest.load("./test/dummy/public/packs/manifest.json")
          webpack_manifest = Webpacker::Manifest.instance.data
          example_asset_path = webpack_manifest.values.first
          if example_asset_path.nil?
            puts "Manifest is blank, all manifests:"
            Dir.glob("./test/dummy/public/packs/*.json").each do |f|
              puts f
              puts File.read(f)
            end
            next
          end
          assert_includes example_asset_path, "http://localhost:8080"
          # Make sure the dev server is up:
          open("http://localhost:8080/application.js")
          detected_dev_server = true
          break
        rescue StandardError => err
          puts err.message
        ensure
          sleep 0.5
          puts i
        end
      end

      # If we didn't hook up with a dev server after 10s,
      # fail loudly.
      assert detected_dev_server

      container = React::ServerRendering::WebpackerManifestContainer.new
      js_file = container.find_asset("application.js")
      # Main file:
      assert_includes js_file, "ReactRailsUJS.loadContext(ctx)"
      # Bundled dependencies:
      assert_includes js_file, "ExportDefaultComponent"
    ensure
      Process.kill(9, webpack_dev_server)
      Process.wait
    end
  end
end
