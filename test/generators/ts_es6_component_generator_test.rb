# frozen_string_literal: true

require "test_helper"
require "generators/react/component_generator"

class TsEs6ComponentGeneratorTest < Rails::Generators::TestCase
  destination File.join(Rails.root, "tmp", "component_generator_test_output")
  setup :prepare_destination
  tests React::Generators::ComponentGenerator

  if ShakapackerHelpers.available?
    def filename
      "app/javascript/components/GeneratedComponent.tsx"
    end
  else
    def filename
      "app/assets/javascripts/components/generated_component.es6.tsx"
    end
  end

  def component_name
    "GeneratedComponent"
  end

  test "uses ts and es6 syntax" do
    run_generator %w[GeneratedComponent name:string --ts --es6]

    assert_file filename, /const #{component_name} = \(props: I#{component_name}Props\) => {/
  end

  test "defines props type" do
    run_generator %w[GeneratedComponent name:string --ts --es6]

    assert_file filename, /name: string;/
  end
end
