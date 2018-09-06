require 'test_helper'

class ReactTest < ActiveSupport::TestCase
  def test_it_camelizes_props
    raw_props = {
      multi_word_sym: {
        nested_key: [
          { double_nested: true },
          1,
          'string item',
          [{ nested_array: {} }]
        ]
      },
      'alreadyCamelized' => :ok
    }

    expected_props = {
      'multiWordSym' => {
        'nestedKey' => [
          { 'doubleNested' => true },
          1,
          'string item',
          [{ 'nestedArray' => {} }]
        ]
      },
      'alreadyCamelized' => :ok
    }

    assert_equal expected_props, React.camelize_props(raw_props)
  end

  def test_it_camelizes_params
    raw_params = ActionController::Parameters.new({
      foo_bar_baz: 'foo bar baz',
      nested_keys: {
        qux_etc: 'bish bash bosh'
      }
    })
    permitted_params = raw_params.permit(:foo_bar_baz, nested_keys: :qux_etc)

    expected_params = {
      'fooBarBaz' => 'foo bar baz',
      'nestedKeys' => {
        'quxEtc' => 'bish bash bosh'
      }
    }

    assert_equal expected_params, React.camelize_props(permitted_params)
  end
end
