require 'execjs'
require 'react/source'
require 'react/jsx/template'

module React
  module JSX
    mattr_accessor :transform_options
    def self.context
      # TODO: create React::Source::contents_for
      contents =
        # If execjs uses therubyracer, there is no 'global'. Make sure
        # we have it so JSX script can work properly.
        'var global = global || this;' +
        File.read(React::Source.bundled_path_for('JSXTransformer.js'))
      @context ||= ExecJS.compile(contents)
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
