module React
  module JSX
    class Processor
      def self.call(input)
        JSX::transform(input[:data])
      end
    end
  end
end
