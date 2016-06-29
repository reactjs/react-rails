module React
  module JSX
    # A Sprockets 3+-compliant processor
    class Processor
      def self.call(input)
        JSX::transform(input[:data])
      end
    end
  end
end
