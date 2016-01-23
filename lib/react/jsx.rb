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
    # If you want to configure per-file transformation options, you may
    # optionally implement:
    # - #transform_with_proc_options(input) => new code
    self.transformer_class = DEFAULT_TRANSFORMER

    def self.transform(code)
      self.transformer ||= transformer_class.new(transform_options)
      self.transformer.transform(code)
    end

    def self.transform_with_proc_options(input)
      self.transformer ||= transformer_class.new(transform_options)
      self.transformer.transform_with_proc_options(input)
    end
  end
end
