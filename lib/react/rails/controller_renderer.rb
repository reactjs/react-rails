class React::Rails::ControllerRenderer
  include React::Rails::ViewHelper
  include ActionView::Helpers::TagHelper
  include ActionView::Helpers::TextHelper

  attr_accessor :output_buffer

  def self.call(*args, &block)
    new.call(*args, &block)
  end

  def call(name, options, &block)
    props = options.fetch(:props, {})
    options = options.slice(:data, :tag).merge(prerender: true)
    react_component(name, props, options, &block)
  end
end
