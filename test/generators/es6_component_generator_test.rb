require 'test_helper'
require 'generators/react/component_generator'

class Es6ComponentGeneratorTest < Rails::Generators::TestCase
  destination File.join(Rails.root, 'tmp', 'component_generator_test_output')
  setup :prepare_destination
  tests React::Generators::ComponentGenerator

  if WebpackerHelpers.available?
    def filename
      'app/javascript/components/GeneratedComponent.js'
    end
  else
    def filename
      'app/assets/javascripts/components/generated_component.es6.jsx'
    end
  end

  def class_name
    'GeneratedComponent'
  end

  test 'uses es6 syntax' do
    run_generator %w(GeneratedComponent name --es6)

    assert_file filename, /^class\s#{class_name}\sextends\sReact\.Component/
  end

  test 'assigns defaultProps after class definintion' do
    run_generator %w(GeneratedComponent name --es6)

    assert_file filename, /\s^#{class_name}\.propTypes/
  end

  test 'generates working jsx' do
    expected_name_div = /React\.createElement\(\s*"div",\s*null,\s*\"Name:\s*\",\s*this\.props\.name\s*\)/x
    expected_shape_div = /React\.createElement\(\s*"div",\s*null,\s*\"Address:\s*\",\s*this\.props\.address\s*\)/x

    run_generator %w(GeneratedComponent name:string address:shape --es6)
    jsx = React::JSX.transform(File.read(File.join(destination_root, filename)))

    assert_match(Regexp.new(expected_name_div), jsx)
    assert_match(Regexp.new(expected_shape_div), jsx)
  end
end
