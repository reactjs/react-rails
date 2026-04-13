# frozen_string_literal: true

require "test_helper"

class RailtieTest < ActionDispatch::IntegrationTest
  VersionedAssets = Struct.new(:version)
  PropshaftLikeAssembly = Struct.new(:config)

  test "reloaders are configured after initializers are loaded" do
    @test_file = File.expand_path("../../dummy/app/pants/yfronts.js", File.dirname(__FILE__))
    FileUtils.touch @test_file
    results = Dummy::Application.reloaders.map(&:updated?)

    assert_includes(results, true)
  end

  test "cache busting updates asset environments with a direct version" do
    assets = VersionedAssets.new("1.0")

    React::Rails::Railtie.append_react_build_to_assets_version!(assets, "development")

    assert_equal "1.0-react-development", assets.version
  end

  test "cache busting updates asset assembly configs with a version" do
    config = ActiveSupport::OrderedOptions.new
    config.version = "1.0"
    assembly = PropshaftLikeAssembly.new(config)

    React::Rails::Railtie.append_react_build_to_assets_version!(assembly, "production")

    assert_equal "1.0-react-production", config.version
  end

  test "cache busting is a no-op when assets is nil" do
    assert_nothing_raised do
      React::Rails::Railtie.append_react_build_to_assets_version!(nil, "development")
    end
  end

  test "cache busting is a no-op when assets has no version" do
    assets = Object.new

    assert_nothing_raised do
      React::Rails::Railtie.append_react_build_to_assets_version!(assets, "development")
    end
  end

  test "component render options default to using the current layout" do
    render_options = React::Rails::Railtie.component_render_options({ status: :accepted }, "<div>SSR</div>")

    assert_equal "<div>SSR</div>", render_options[:inline]
    assert render_options[:layout]
    assert_equal :accepted, render_options[:status]
  end

  test "component render options preserve explicit layout overrides" do
    render_options = React::Rails::Railtie.component_render_options({ layout: false }, "<div>SSR</div>")

    refute render_options[:layout]
  end

  test "component render options preserve a named layout override" do
    render_options = React::Rails::Railtie.component_render_options({ layout: "admin" }, "<div>SSR</div>")

    assert_equal "admin", render_options[:layout]
  end
end
