require 'execjs'
require 'react/source'
require 'react/jsx/template'
require 'rails'

module React
  module JSX
    def self.context
      # lazily loaded during first request and reloaded every time when in dev or test
      unless @context && ::Rails.env.production?

        # TODO: create React::Source::contents_for
        contents =
          # If execjs uses therubyracer, there is no 'global'. Make sure
          # we have it so JSX script can work properly.
          'var global = global || this;' +
          File.read(React::Source.bundled_path_for('JSXTransformer.js'))
        @context = ExecJS.compile(contents)
      end

      @context
    end

    def self.transform(code)
      result = context.call('JSXTransformer.transform', code)
      return result['code']
    end
  end
end
