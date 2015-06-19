require 'execjs'
require 'react/jsx/template'
require 'react/jsx/jsx_transformer'
require 'react/jsx/babel_transformer'
require 'rails'

module React
  module JSX
    mattr_accessor :transform_options, :transformer_class

    # You can assign `React::JSX.transformer_class = `
    # to provide your own transformer. It must implement:
    # - #initialize(options)
    # - #transform(code) => new code
    self.transformer_class = BabelTransformer

    def self.transform(code)
      transformer.transform(code)
    end

    def self.transformer
      # lazily loaded during first request and reloaded every time when in dev or test
      if @transformer.nil? || !::Rails.env.production?
        @transformer = transformer_class.new(transform_options)
      end
      @transformer
    end
  end
end
