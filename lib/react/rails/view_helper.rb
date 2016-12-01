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

      # Render a React component into the view
      # using the {helper_implementation_class}
      #
      # If called during a Rails controller-managed request, use the instance
      # created by the controller.
      #
      # Otherwise, make a new instance.
      def react_component(*args, &block)
        helper_obj = @__react_component_helper ||= helper_implementation_class.new
        helper_obj.react_component(*args) { capture &block if block_given? }
      end
    end
  end
end
