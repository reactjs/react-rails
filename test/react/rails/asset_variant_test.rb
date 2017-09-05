require 'test_helper'

class AssetVariantTest < ActiveSupport::TestCase
  def build_variant(options)
    React::Rails::AssetVariant.new(options)
  end

  def test_it_points_to_different_directories_for_react
    production_variant = build_variant(variant: :production)
    assert_match(%r{/lib/assets/react-source/production}, production_variant.react_directory)

    development_variant = build_variant(variant: nil)
    assert_match(%r{/lib/assets/react-source/development}, development_variant.react_directory)
  end

  def test_points_to_jsx_transformer
    variant = build_variant({})
    assert_match(%r{/lib/assets/javascripts/}, variant.jsx_directory)
  end

  def test_it_includes_addons_if_requested
    asset_variant = build_variant(addons: true)
    assert_equal "development-with-addons", asset_variant.react_build
  end
end
