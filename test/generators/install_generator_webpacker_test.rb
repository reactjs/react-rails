require 'test_helper'
require 'generators/react/install_generator'

WebpackerHelpers.when_webpacker_available do
  class InstallGeneratorWebpackerTest < Rails::Generators::TestCase
    destination File.join(Rails.root, 'tmp', 'generator_test_output')
    tests React::Generators::InstallGenerator
    setup :prepare_destination

    EXPECTED_SETUP = %|// Support component names relative to this directory:
var componentRequireContext = require.context("components", true)
var ReactRailsUJS = require("react_ujs")
ReactRailsUJS.useContext(componentRequireContext)
|

    DEFAULT_SERVER_RENDERING_PACK_PATH = "app/javascript/packs/server_rendering.js"

    def copy_directory(dir)
      source = Rails.root.join(dir)
      dest = Rails.root.join(destination_root, File.dirname(dir))

      FileUtils.mkdir_p dest
      FileUtils.cp_r source, dest
    end

    def test_adds_requires_to_application_js
      run_generator
      assert_file "app/javascript/packs/application.js", EXPECTED_SETUP
      assert_file "app/javascript/components"
    end

    def test_creates_server_rendering_js_with_default_requires
      run_generator
      assert_file DEFAULT_SERVER_RENDERING_PACK_PATH do |contents|
        assert_includes contents, "var componentRequireContext = require.context(\"components\", true)\n"
        assert_includes contents, "var ReactRailsUJS = require(\"react_ujs\")\n"
        assert_includes contents, "ReactRailsUJS.useContext(componentRequireContext)\n"
      end
    end

    def test_skipping_server_rendering
      run_generator %w(--skip-server-rendering)
      assert_no_file DEFAULT_SERVER_RENDERING_PACK_PATH
    end
  end
end
