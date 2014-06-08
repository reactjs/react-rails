require 'execjs'
require 'react/source'
require 'react/cjsx/template'

module React
  module CJSX
    def self.context
      cjsx_path = File.expand_path('../../../vendor/assets/javascripts/CJSXTransformer.js', __FILE__)
      contents =
        # If execjs uses therubyracer, there is no 'global'. Make sure
        # we have it so CJSX script can work properly.
        'var global = global || this;' +
        File.read(cjsx_path)
      @context ||= ExecJS.compile(contents)
    end

    def self.transform(code)
      result = context.call('CJSXTransformer.transform', code)
      return result
    end
  end
end
