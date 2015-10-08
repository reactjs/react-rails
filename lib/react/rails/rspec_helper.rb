module React
  module Rails
    module RspecHelper
      extend ActiveSupport::Concern

      included do |mod|
        mod.class_eval do
          before { setup_react_rails_rspec } if respond_to?(:before)
        end

        def setup_react_rails_rspec
          helper = controller.setup_react_component_helper if respond_to?(:controller)
          assign :__react_component_helper, helper if helper && respond_to?(:assign)
        end
      end
    end
  end
end
