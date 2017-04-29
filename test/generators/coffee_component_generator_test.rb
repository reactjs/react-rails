require 'test_helper'
require 'generators/react/component_generator'

class CoffeeComponentGeneratorTest < Rails::Generators::TestCase
  destination File.join(Rails.root, 'tmp', 'component_generator_test_output')
  setup :prepare_destination
  tests React::Generators::ComponentGenerator

  if WebpackerHelpers.available?
    def filename
      "app/javascript/components/GeneratedComponent.coffee"
    end
  else
    def filename
      'app/assets/javascripts/components/generated_component.js.jsx.coffee'
    end
  end
  def class_name
    'GeneratedComponent'
  end

  test 'that it the uses CoffeeScript syntax' do
    run_generator %w(GeneratedComponent name --coffee)

    assert_file filename, /^class @#{class_name}\sextends\sReact\.Component/
  end

  test 'that propTypes get assigned' do
    run_generator %w(GeneratedComponent name --coffee)

    assert_file filename, /@propTypes\s=/
    assert_file filename, /React.PropTypes/
  end

  test 'that it generates working jsx' do
    expected_name_div = /React\.createElement\(\s*"div",\s*null,\s*"Name:\s*",\s*this\.props\.name\s*\)/x
    expected_shape_div = /React\.createElement\(\s*"div",\s*null,\s*"Address:\s*",\s*this\.props\.address\s*\)/x

    run_generator %w(GeneratedComponent name:string address:shape --coffee)
    jsx = React::JSX.transform(CoffeeScript.compile(File.read(File.join(destination_root, filename))))

    assert_match(Regexp.new(expected_name_div), jsx)
    assert_match(Regexp.new(expected_shape_div), jsx)
  end
end
