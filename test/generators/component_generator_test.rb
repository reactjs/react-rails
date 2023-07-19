# frozen_string_literal: true

require "test_helper"
require "generators/react/component_generator"

class ComponentGeneratorTest < Rails::Generators::TestCase
  destination File.join(Rails.root, "tmp", "component_generator_test_output")
  setup :prepare_destination
  tests React::Generators::ComponentGenerator

  if WebpackerHelpers.available?
    def filename
      "app/javascript/components/GeneratedComponent.js"
    end

    def filename_with_subfolder
      "app/javascript/components/generated_folder/GeneratedComponent.js"
    end
  else
    def filename
      "app/assets/javascripts/components/generated_component.js.jsx"
    end

    def filename_with_subfolder
      "app/assets/javascripts/components/generated_folder/generated_component.js.jsx"
    end
  end

  test "creates the component file" do
    run_generator %w[GeneratedComponent]

    assert_file filename do |contents|
      if WebpackerHelpers.available?
        assert_match(/^import React from "react"/, contents)
        assert_match(/export default GeneratedComponent\n$/m, contents)
      end
    end
  end

  test "creates the component file in a subdirectory" do
    puts WebpackerHelpers.available?
    run_generator %w[generated_folder/GeneratedComponent]
    assert_file filename_with_subfolder do |contents|
      if WebpackerHelpers.available?
        assert_match(/^import React from "react"/, contents)
        assert_match(/export default GeneratedComponent\n$/m, contents)
      end
    end
  end

  test "creates the component file with a node argument" do
    run_generator %w[GeneratedComponent name]

    assert_file filename, /name: PropTypes.node/
  end

  test "creates the component file with various standard proptypes" do
    proptypes = %w[string bool number array func number object any]
    run_generator %w[GeneratedComponent] + proptypes.map { |type| "my_#{type}:#{type}" }

    proptypes.each do |type|
      assert_file filename, /my#{type.capitalize}: PropTypes.#{type}/
    end
  end

  test "creates a component file with an instanceOf property" do
    run_generator %w[GeneratedComponent favorite_food:instanceOf{food}]

    assert_file filename, /favoriteFood: PropTypes.instanceOf\(Food\)/
  end

  test "creates a component file with a oneOf property" do
    run_generator %w[GeneratedComponent favorite_food:oneOf{pizza,hamburgers}]

    assert_file filename, /favoriteFood: PropTypes.oneOf\(\['pizza','hamburgers'\]\)/
  end

  test "creates a component file with a oneOfType property" do
    run_generator %w[GeneratedComponent favorite_food:oneOfType{string,Food}]
    expected_property = "favoriteFood: PropTypes.oneOfType([PropTypes.string,PropTypes.instanceOf(Food)])"

    assert_file filename, Regexp.new(Regexp.quote(expected_property))
  end

  test "generates working jsx" do
    run_generator %w[GeneratedComponent name:string address:shape]
    jsx = React::JSX.transform(File.read(File.join(destination_root, filename)))

    assert_match(Regexp.new(expected_working_jsx), jsx)
  end
end
