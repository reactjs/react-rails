require 'test_helper'
require 'generators/react/component_generator'

class ComponentGeneratorTest < Rails::Generators::TestCase
  destination File.join(Rails.root, 'tmp', 'component_generator_test_output')
  setup :prepare_destination
  tests React::Generators::ComponentGenerator

  if WebpackerHelpers.available?
    def filename
      "app/javascript/components/GeneratedComponent.js"
    end
  else
    def filename
      'app/assets/javascripts/components/generated_component.js.jsx'
    end
  end

  def test_creates_the_component_file
    run_generator %w(GeneratedComponent)

    assert_file filename do |contents|
      if WebpackerHelpers.available?
        assert_match /^var React = require\("react"\)/, contents
        assert_match /module\.exports = GeneratedComponent\n$/m, contents
      end
    end
  end

  def test_creates_the_component_file_with_a_node_argument
    run_generator %w(GeneratedComponent name)
    assert_file filename, %r{name: React.PropTypes.node}
  end

  def test_creates_the_component_file_with_various_standard_proptypes
    proptypes = %w(string bool number array func number object any)
    run_generator %w(GeneratedComponent) + proptypes.map { |type| "my_#{type}:#{type}" }
    proptypes.each do |type|
      assert_file filename, %r(my#{type.capitalize}: React.PropTypes.#{type})
    end
  end

  def test_creates_a_component_file_with_an_instanceOf_property
    run_generator %w(GeneratedComponent favorite_food:instanceOf{food})
    assert_file filename, /favoriteFood: React.PropTypes.instanceOf\(Food\)/
  end

  def test_creates_a_component_file_with_a_oneOf_property
    run_generator %w(GeneratedComponent favorite_food:oneOf{pizza,hamburgers})
    assert_file filename, /favoriteFood: React.PropTypes.oneOf\(\['pizza','hamburgers'\]\)/
  end

  def test_creates_a_component_file_with_a_oneOfType_property
    run_generator %w(GeneratedComponent favorite_food:oneOfType{string,Food})
    expected_property = "favoriteFood: React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.instanceOf(Food)])"

    assert_file filename, Regexp.new(Regexp.quote(expected_property))
  end

  def test_generates_working_jsx
    expected_name_div = /React\.createElement\(\s*"div",\s*null,\s*\"Name:\s*\",\s*this\.props\.name\s*\)/x
    expected_shape_div = /React\.createElement\(\s*"div",\s*null,\s*\"Address:\s*\",\s*this\.props\.address\s*\)/x

    run_generator %w(GeneratedComponent name:string address:shape)
    jsx = React::JSX.transform(File.read(File.join(destination_root, filename)))

    assert_match(Regexp.new(expected_name_div), jsx)
    assert_match(Regexp.new(expected_shape_div), jsx)
  end
end
