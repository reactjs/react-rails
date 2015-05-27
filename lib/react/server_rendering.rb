require 'connection_pool'
require 'react/server_rendering/sprockets_renderer'

module React
  module ServerRendering
    mattr_accessor :renderer, :renderer_options,
      :pool_size, :pool_timeout

    def self.reset_pool
      options = {size: pool_size, timeout: pool_timeout}
      @@pool = ConnectionPool.new(options) { create_renderer }
    end

    def self.render(component_name, props, prerender_options)
      @@pool.with do |renderer|
        renderer.render(component_name, props, prerender_options)
      end
    end

    def self.create_renderer
      renderer.new(renderer_options)
    end
  end
end