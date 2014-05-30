require 'execjs'
require 'react/source'
require 'react/cjsx/template'

module React
  module CJSX
    def self.transform(code)
      result = `echo "#{code}" | cjsx -sc`
      return result
    end
  end
end
