# Extends ExecJSRenderer for the Rails environment
# - builds JS code out of the asset pipeline
# - stringifies props
# - implements console replay
module React
  module ServerRendering
    class SprocketsRenderer < ExecJSRenderer
      # Reimplement console methods for replaying on the client
      CONSOLE_POLYFILL = File.read(File.join(File.dirname(__FILE__), "sprockets_renderer/console_polyfill.js"))
      CONSOLE_REPLAY   = File.read(File.join(File.dirname(__FILE__), "sprockets_renderer/console_replay.js"))

      def initialize(options={})
        @replay_console = options.fetch(:replay_console, true)
        filenames = options.fetch(:files, ["react-server.js", "components.js"])
        js_code = CONSOLE_POLYFILL.dup

        filenames.each do |filename|
          js_code << ::Rails.application.assets[filename].to_s
        end

        super(options.merge(code: js_code))
      end

      def render(component_name, props, prerender_options)
        # pass prerender: :static to use renderToStaticMarkup
        react_render_method = if prerender_options == :static
            "renderToStaticMarkup"
          else
            "renderToString"
          end

        if !props.is_a?(String)
          props = props.to_json
        end

        super(component_name, props, {render_function: react_render_method})
      end

      def after_render(component_name, props, prerender_options)
        @replay_console ? CONSOLE_REPLAY : ""
      end
    end
  end
end
