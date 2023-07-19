# frozen_string_literal: true

require "test_helper"
require "generators/react/component_generator"

class CoffeeComponentGeneratorTest < Rails::Generators::TestCase
  destination File.join(Rails.root, "tmp", "component_generator_test_output")
  setup :prepare_destination
  tests React::Generators::ComponentGenerator

  if WebpackerHelpers.available?
    def filename
      "app/javascript/components/GeneratedComponent.coffee"
    end

    test "that Webpacker defaults to ES6" do
      run_generator %w[GeneratedComponent name]

      es6 = File.read(File.join(destination_root, "app/javascript/components/GeneratedComponent.js"))

      assert_match(/extends React.Component/, es6)
    end
  else
    def filename
      "app/assets/javascripts/components/generated_component.js.jsx.coffee"
    end
  end
  def class_name
    "GeneratedComponent"
  end

  test "that it the uses CoffeeScript syntax" do
    run_generator %w[GeneratedComponent name --coffee]

    assert_file filename, /^class #{class_name}\sextends\sReact\.Component/
  end

  test "that propTypes get assigned" do
    run_generator %w[GeneratedComponent name --coffee]

    assert_file filename, /@propTypes\s=/
    assert_file filename, /PropTypes/
  end

  test "that it generates working jsx" do
    run_generator %w[GeneratedComponent name:string address:shape --coffee]
    jsx = React::JSX.transform(CoffeeScript.compile(File.read(File.join(destination_root, filename))))

    assert_match(Regexp.new(expected_working_jsx), jsx)
  end
end
