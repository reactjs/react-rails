module React
  # Recursively camelize `props`, returning a new Hash
  # @param props [Object] If it's a Hash or Array, it will be recursed. Otherwise it will be returned.
  # @return [Hash] a new hash whose keys are camelized strings
  def self.camelize_props(props)
    props_as_json = props.as_json

    case props_as_json
    when Hash
      props_as_json.each_with_object({}) do |(key, value), new_props|
        new_key = key.to_s.camelize(:lower)
        new_value = camelize_props(value)
        new_props[new_key] = new_value
      end
    when Array
      props_as_json.map { |item| camelize_props(item) }
    else
      props_as_json
    end
  end
end
