module React
  module Rails
    # A renderer class suitable for `ActionController::Renderers`.
    # It is associated to `:component` in the Railtie.
    #
    # It is prerendered by default with {React::ServerRendering}.
    # Set options[:prerender] to `false` to disable prerendering.
    #
    # @example Rendering a component from a controller
    #   class TodosController < ApplicationController
    #     def index
    #       @todos = Todo.all
    #       render component: 'TodoList', props: { todos: @todos }, tag: 'span', class: 'todo'
    #     end
    #   end
    class ControllerRenderer
      include React::Rails::ViewHelper
      include ActionView::Helpers::TagHelper
      include ActionView::Helpers::TextHelper

      attr_accessor :output_buffer

      def initialize(options={})
        controller = options[:controller]
        @__react_component_helper = controller.__react_component_helper
      end

      # @return [String] HTML for `component_name` with `options[:props]`
      def call(component_name, options, &block)
        props = options.fetch(:props, {})
        options = default_options.merge(options.slice(:data, :aria, :tag, :class, :id, :prerender, :camelize_props))
        react_component(component_name, props, options, &block)
      end

      private

      def default_options
        { prerender: true }
      end
    end
  end
end
