require 'test_helper'

class AssetVariantTest < ActiveSupport::TestCase
  def build_variant(options)
    React::Rails::AssetVariant.new(options)
  end

  test 'it points to different directories for react' do
    production_variant = build_variant(variant: :production)
    assert_match(%r{/lib/assets/react-source/production}, production_variant.react_directory)

    development_variant = build_variant(variant: nil)
    assert_match(%r{/lib/assets/react-source/development}, development_variant.react_directory)
  end

  test 'points to jsx transformer' do
    variant = build_variant({})
    assert_match(%r{/lib/assets/javascripts/}, variant.jsx_directory)
  end
end
