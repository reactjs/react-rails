module React
  module JSX
    class Processor
      def self.instance
        @instance ||= new
      end
      
      def self.call(input)
        instance.call(input)
      end

      def call(input)
        {data: JSX::transform(input[:data])}
      end
    end
  end
end
