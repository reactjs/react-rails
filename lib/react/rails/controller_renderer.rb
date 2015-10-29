class React::Rails::ControllerRenderer
  include React::Rails::ViewHelper
  include ActionView::Helpers::TagHelper
  include ActionView::Helpers::TextHelper

  attr_accessor :output_buffer

  def initialize(options={})
    controller = options[:controller]
    @__react_component_helper = controller.__react_component_helper
  end

  def call(name, options, &block)
    props = options.fetch(:props, {})
    options = options.slice(:data, :aria, :tag, :class, :id).merge(prerender: true)
    react_component(name, props, options, &block)
  end
end
