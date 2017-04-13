require 'test_helper'
require 'generators/react/component_generator'

class ComponentGeneratorTest < Rails::Generators::TestCase
  destination File.join(Rails.root, 'tmp', 'component_generator_test_output')
  setup :prepare_destination
  tests React::Generators::ComponentGenerator

  if WebpackerHelpers.available?
    def filename
      "app/javascript/components/generated_component.js"
    end
  else
    def filename
      'app/assets/javascripts/components/generated_component.js.jsx'
    end
  end

  test "creates the component file" do
    run_generator %w(GeneratedComponent)

    assert_file filename
  end

  test "creates the component file with a node argument" do
    run_generator %w(GeneratedComponent name)
    assert_file filename, %r{name: React.PropTypes.node}
  end

  test "creates the component file with various standard proptypes" do
    proptypes = %w(string bool number array func number object any)
    run_generator %w(GeneratedComponent) + proptypes.map { |type| "my_#{type}:#{type}" }
    proptypes.each do |type|
      assert_file filename, %r(my#{type.capitalize}: React.PropTypes.#{type})
    end
  end

  test "creates a component file with an instanceOf property" do
    run_generator %w(GeneratedComponent favorite_food:instanceOf{food})
    assert_file filename, /favoriteFood: React.PropTypes.instanceOf\(Food\)/
  end

  test "creates a component file with a oneOf property" do
    run_generator %w(GeneratedComponent favorite_food:oneOf{pizza,hamburgers})
    assert_file filename, /favoriteFood: React.PropTypes.oneOf\(\['pizza','hamburgers'\]\)/
  end

  test "creates a component file with a oneOfType property" do
    run_generator %w(GeneratedComponent favorite_food:oneOfType{string,Food})
    expected_property = "favoriteFood: React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.instanceOf(Food)])"

    assert_file filename, Regexp.new(Regexp.quote(expected_property))
  end

  test "generates working jsx" do
    expected_name_div = /React\.createElement\(\s*"div",\s*null,\s*\"Name:\s*\",\s*this\.props\.name\s*\)/x
    expected_shape_div = /React\.createElement\(\s*"div",\s*null,\s*\"Address:\s*\",\s*this\.props\.address\s*\)/x

    run_generator %w(GeneratedComponent name:string address:shape)
    jsx = React::JSX.transform(File.read(File.join(destination_root, filename)))

    assert_match(Regexp.new(expected_name_div), jsx)
    assert_match(Regexp.new(expected_shape_div), jsx)
  end
end
