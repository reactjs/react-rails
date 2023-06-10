# frozen_string_literal: true

require "test_helper"
require "generators/react/install_generator"

class InstallGeneratorWebpackerTest < Rails::Generators::TestCase
  WebpackerHelpers.when_webpacker_available do
    destination File.join(Rails.root, "tmp", "generator_test_output")
    tests React::Generators::InstallGenerator
    setup :prepare_destination

    expected_setup = %|// Support component names relative to this directory:
var componentRequireContext = require.context("components", true);
var ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(componentRequireContext);
|

    default_server_rendering_pack_path = "app/javascript/packs/server_rendering.js"

    def copy_directory(dir)
      source = Rails.root.join(dir)
      dest = Rails.root.join(destination_root, File.dirname(dir))

      FileUtils.mkdir_p dest
      FileUtils.cp_r source, dest
    end

    test "adds requires to `application.js`" do
      run_generator

      assert_file "app/javascript/packs/application.js", expected_setup
      assert_file "app/javascript/components"
    end

    test "creates server_rendering.js with default requires" do # rubocop:disable Minitest/MultipleAssertions
      run_generator
      assert_file default_server_rendering_pack_path do |contents|
        assert_includes contents, "var componentRequireContext = require.context(\"components\", true);\n"
        assert_includes contents, "var ReactRailsUJS = require(\"react_ujs\");\n"
        assert_includes contents, "ReactRailsUJS.useContext(componentRequireContext);\n"
      end
    end

    test "skipping server rendering" do
      run_generator %w[--skip-server-rendering]

      assert_no_file default_server_rendering_pack_path
    end
  end
end
