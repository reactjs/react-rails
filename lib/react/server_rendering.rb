require 'connection_pool'
require 'react/server_rendering/exec_js_renderer'
require 'react/server_rendering/bundle_renderer'

module React
  module ServerRendering
    mattr_accessor :renderer, :renderer_options,
      :pool_size, :pool_timeout

    self.renderer_options = {}

    # Discard the old ConnectionPool & create a new one.
    # This will clear all state such as loaded code, JS VM state, or options.
    # @return [void]
    def self.reset_pool
      options = { size: pool_size, timeout: pool_timeout }
      @@pool = ConnectionPool.new(options) { self.renderer.new(self.renderer_options) }
    end

    # Check a renderer out of the pool and use it to render the component.
    # @param component_name [String] Component identifier, looked up by UJS
    # @param props [String, Hash] Props for this component
    # @param prerender_options [Hash] Renderer-specific options
    # @return [String] Prerendered HTML from `component_name`
    def self.render(component_name, props, prerender_options)
      @@pool.with do |renderer|
        renderer.render(component_name, props, prerender_options)
      end
    end

    # Yield a renderer for an arbitrary block
    def self.with_renderer
      @@pool.with { |renderer| yield(renderer) }
    end

    # Raised when something went wrong during server rendering.
    class PrerenderError < RuntimeError
      def initialize(component_name, props, js_message)
        message = ["Encountered error \"#{js_message.inspect}\" when prerendering #{component_name} with #{props}",
                    js_message.backtrace.join("\n")].join("\n")
        super(message)
      end
    end
  end
end
