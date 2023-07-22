# frozen_string_literal: true

require "test_helper"
require "generators/react/component_generator"

class Es6ComponentGeneratorTest < Rails::Generators::TestCase
  destination File.join(Rails.root, "tmp", "component_generator_test_output")
  setup :prepare_destination
  tests React::Generators::ComponentGenerator

  if ShakapackerHelpers.available?
    def filename
      "app/javascript/components/GeneratedComponent.js"
    end
  else
    def filename
      "app/assets/javascripts/components/generated_component.es6.jsx"
    end
  end

  def component_name
    "GeneratedComponent"
  end

  test "uses es6 syntax" do
    run_generator %w[GeneratedComponent name --es6]

    assert_file filename, /const #{component_name} = \(props\) => {/
  end

  test "assigns defaultProps after function definintion" do
    run_generator %w[GeneratedComponent name --es6]

    assert_file filename, /\s^#{component_name}\.propTypes/
  end

  test "generates working jsx" do
    run_generator %w[GeneratedComponent name:string address:shape --es6]
    jsx = React::JSX.transform(File.read(File.join(destination_root, filename)))

    assert_match(Regexp.new(expected_working_jsx_in_function_component), jsx)
  end
end
