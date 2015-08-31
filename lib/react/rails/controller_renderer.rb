class React::Rails::ControllerRenderer
  include React::Rails::ViewHelper
  include ActionView::Helpers::TagHelper
  include ActionView::Helpers::TextHelper

  attr_accessor :output_buffer

  attr_reader :request
  def initialize(options={})
    @request = options[:request]
  end

  def call(name, options, &block)
    props = options.fetch(:props, {})
    options = options.slice(:data, :tag).merge(prerender: true)
    react_component(name, props, options, &block)
  end
end
