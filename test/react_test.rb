# frozen_string_literal: true

require "test_helper"

class ReactTest < ActiveSupport::TestCase
  def test_it_camelizes_props
    raw_props = {
      multi_word_sym: {
        nested_key: [
          { double_nested: true },
          1,
          "string item",
          [{ nested_array: {} }]
        ]
      },
      "alreadyCamelized" => :ok
    }

    expected_props = {
      "multiWordSym" => {
        "nestedKey" => [
          { "doubleNested" => true },
          1,
          "string item",
          [{ "nestedArray" => {} }]
        ]
      },
      "alreadyCamelized" => "ok"
    }

    assert_equal expected_props, React.camelize_props(raw_props)
  end

  def test_it_camelizes_params
    raw_params = ActionController::Parameters.new({
                                                    foo_bar_baz: "foo bar baz",
                                                    nested_keys: {
                                                      qux_etc: "bish bash bosh"
                                                    }
                                                  })
    permitted_params = raw_params.permit(:foo_bar_baz, nested_keys: :qux_etc)

    expected_params = {
      "fooBarBaz" => "foo bar baz",
      "nestedKeys" => {
        "quxEtc" => "bish bash bosh"
      }
    }

    assert_equal expected_params, React.camelize_props(permitted_params)
  end

  def test_it_camelizes_json_serializable_objects
    my_json_serializer = Class.new do
      def initialize(data)
        @data = data
      end

      def as_json
        @data
      end
    end

    raw_props = {
      key_one: "value1",
      key_two: my_json_serializer.new(
        nested_key_one: "nested_value1",
        nested_key_two: %w[nested value two]
      )
    }

    expected_params = {
      "keyOne" => "value1",
      "keyTwo" => {
        "nestedKeyOne" => "nested_value1",
        "nestedKeyTwo" => %w[nested value two]
      }
    }

    assert_equal expected_params, React.camelize_props(raw_props)
  end
end
