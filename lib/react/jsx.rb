require 'execjs'
require 'react/jsx/processor'
require 'react/jsx/template'
require 'react/jsx/jsx_transformer'
require 'react/jsx/babel_transformer'
require 'react/jsx/sprockets_strategy'
require 'rails'

module React
  module JSX
    DEFAULT_TRANSFORMER = BabelTransformer
    mattr_accessor :transform_options, :transformer_class, :transformer

    # You can assign `config.react.jsx_transformer_class = `
    # to provide your own transformer. It must implement:
    # - #initialize(options)
    # - #transform(code) => new code
    self.transformer_class = DEFAULT_TRANSFORMER

    # @param code [String] JSX code to transform into JavaScript
    # @return [String] plain, browser-ready JavaScript code
    def self.transform(code)
      self.transformer ||= transformer_class.new(transform_options)
      self.transformer.transform(code)
    end
  end
end
