module React
  module Rails
    module ViewHelper
      # This class will be used for inserting tags into HTML.
      # It should implement:
      #   - #setup(controller_instance)
      #   - #teardown(controller_instance)
      #   - #react_component(name, props, options &block)
      # The default is {React::Rails::ComponentMount}
      mattr_accessor :helper_implementation_class

      def react_component(*args, &block)
        helper_obj = @__react_component_helper
        helper_obj.react_component(*args, &block)
      end
    end
  end
end
