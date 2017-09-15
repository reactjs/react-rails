require 'test_helper'

class ReactTest < ActiveSupport::TestCase
  def test_it_camelizes_props
    raw_props = {
      multi_word_sym: {
        nested_key: [
          { double_nested: true },
          1,
          'string item',
          [ { nested_array: {} }],
        ]
      },
      'alreadyCamelized' => :ok,
    }

    expected_props = {
      'multiWordSym' => {
        'nestedKey' => [
          { 'doubleNested' => true },
          1,
          'string item',
          [ { 'nestedArray' => {} }],
        ]
      },
      'alreadyCamelized' => :ok
    }

    assert_equal expected_props, React.camelize_props(raw_props)
  end
end
