require 'execjs'
require 'react/jsx/processor'
require 'react/jsx/template'
require 'react/jsx/jsx_transformer'
require 'react/jsx/babel_transformer'
require 'rails'

module React
  module JSX
    DEFAULT_TRANSFORMER = BabelTransformer
    mattr_accessor :transform_options, :transformer_class, :transformer

    # You can assign `config.react.jsx_transformer_class = `
    # to provide your own transformer. It must implement:
    # - #initialize(options)
    # - #transform(code) => new code
    #
    # If you want to configure per-file transformation options with a proc, you may
    # accept an optional second parameter
    # - #transform(code, local_options = {}) => new code
    self.transformer_class = DEFAULT_TRANSFORMER

    def self.transform(code, input = {})
      self.transformer ||= transformer_class.new(transform_options)

      if self.transformer.method(:transform).arity == 1
        self.transformer.transform(code)
      else
        local_options = self.transform_options
        local_options = local_options.call(input) if local_options.respond_to?(:call)
        self.transformer.transform(code, local_options)
      end
    end
  end
end
