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
        js_code = CONSOLE_POLYFILL.dup
        js_code << load_asset_files(options)
        super(options.merge(code: js_code))
      end

      # pass prerender: :static to use renderToStaticMarkup
      def render(component_name, props, prerender_options)
        if !props.is_a?(String)
          props = props.to_json
        end

        super(component_name, props, prerender_options_with_defaults(prerender_options))
      end

      def after_render(component_name, props, prerender_options)
        @replay_console ? CONSOLE_REPLAY : ""
      end

      private

      def prerender_options_with_defaults(prerender_options)
        react_render_method = if prerender_options == :static
            "renderToStaticMarkup"
          else
            "renderToString"
          end

        render_function_option = {
          render_function: react_render_method
        }

        if prerender_options.respond_to?(:merge)
          prerender_options.merge(render_function_option)
        else
          render_function_option
        end
      end

      def load_asset_files(options)
        "".tap do |js_code|
          filenames = options.fetch(:files, ["react-server.js", "components.js"])
          filenames.each do |filename|
            js_code << ::Rails.application.assets[filename].to_s
          end
        end
      end

    end
  end
end
