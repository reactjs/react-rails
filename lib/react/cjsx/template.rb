require 'tilt'

module React
  module CJSX

    class Template < Tilt::Template
      self.default_mime_type = 'application/javascript'

      def prepare
      end

      def evaluate(scopre, locals, &block)
        @output ||= CJSX::transform(data)
      end
    end
  end
end
