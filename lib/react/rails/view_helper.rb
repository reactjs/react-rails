module React
  module Rails
    module ViewHelper
      # This class will be used for inserting tags into HTML.
      # It should implement react_component(name, props, options &block)
      # The default is {React::Rails::ComponentMount}
      mattr_accessor :helper_implementation_class

      def react_component(*args, &block)
        self.helper_implementation_class.new.react_component(*args, &block)
      end
    end
  end
end
