require 'execjs'
require 'react/jsx/template'
require 'rails'

module React
  module JSX
    mattr_accessor :transform_options

    def self.context
      # lazily loaded during first request and reloaded every time when in dev or test
      unless @context && ::Rails.env.production?
        contents =
          # If execjs uses therubyracer, there is no 'global'. Make sure
          # we have it so JSX script can work properly.
          'var global = global || this;' +

          # search for transformer file using sprockets - allows user to override
          # this file in his own application
          File.read(::Rails.application.assets.resolve('JSXTransformer.js'))

        @context = ExecJS.compile(contents)
      end

      @context
    end

    def self.transform(code, options={})
      js_options = {
        stripTypes: options[:strip_types],
        harmony: options[:harmony],
      }
      result = context.call('JSXTransformer.transform', code, js_options)
      return result['code']
    end
  end
end
