
require 'test_helper'
require 'generators/react/component_generator'

class FunctionComponentGeneratorTest < Rails::Generators::TestCase
  destination File.join(Rails.root, 'tmp', 'component_generator_test_output')
  setup :prepare_destination
  tests React::Generators::ComponentGenerator

  if WebpackerHelpers.available?
    def filename
      'app/javascript/components/GeneratedComponent.js'
    end
  else
    def filename
      'app/assets/javascripts/components/generated_component.func.jsx'
    end
  end

  def component_name
    'GeneratedComponent'
  end

  test 'uses function syntax' do
    run_generator %w(GeneratedComponent name --function)

    assert_file filename, /^function\s#{component_name}\(\) {/
  end

  test 'accepts `--func`` as an alias to `--function` option' do
    run_generator %w(GeneratedComponent name --func)

    assert_file filename, /^function\s#{component_name}\(\) {/
  end

  test 'assigns defaultProps after class definintion' do
    run_generator %w(GeneratedComponent name --function)

    assert_file filename, /\s^#{component_name}\.propTypes/
  end

  test 'generates working function' do
    run_generator %w(GeneratedComponent name:string address:shape --function)
    jsx = React::JSX.transform(File.read(File.join(destination_root, filename)))

    assert_match(Regexp.new(expected_working_jsx), jsx)
  end
end
