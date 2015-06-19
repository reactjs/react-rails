require 'connection_pool'
require 'react/server_rendering/exec_js_renderer'
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

    class PrerenderError < RuntimeError
      def initialize(component_name, props, js_message)
        message = ["Encountered error \"#{js_message}\" when prerendering #{component_name} with #{props}",
                    js_message.backtrace.join("\n")].join("\n")
        super(message)
      end
    end
  end
end