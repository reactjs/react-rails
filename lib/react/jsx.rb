require 'execjs'
require 'react/jsx/template'
require 'react/jsx/transformer'
require 'rails'

module React
  module JSX
    mattr_accessor :transform_options
    def self.transform(code)
      transformer.transform(code)
    end

    def self.transformer
      # lazily loaded during first request and reloaded every time when in dev or test
      if @transformer.nil? || !::Rails.env.production?
        @transformer = Transformer.new(transform_options)
      end
      @transformer
    end
  end
end
