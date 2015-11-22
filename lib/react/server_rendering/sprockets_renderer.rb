# Extends ExecJSRenderer for the Rails environment
# - builds JS code out of the asset pipeline
# - stringifies props
# - implements console replay
module React
  module ServerRendering
    class SprocketsRenderer < ExecJSRenderer
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
          props = camelize_props_key(props).to_json
        end

        super(component_name, props, {render_function: react_render_method})
      end

      def after_render(component_name, props, prerender_options)
        @replay_console ? CONSOLE_REPLAY : ""
      end

      def camelize_props_key(props)
        return props unless props.is_a?(Hash)
        props.inject({}) do |h, (k,v)|
          h[k.to_s.camelize(:lower)] = v.is_a?(Hash) ? camelize_props_key(v) : v; h
        end
      end

      # Reimplement console methods for replaying on the client
      CONSOLE_POLYFILL = <<-JS
        var console = { history: [] };
        ['error', 'log', 'info', 'warn'].forEach(function (fn) {
          console[fn] = function () {
            console.history.push({level: fn, arguments: Array.prototype.slice.call(arguments)});
          };
        });
      JS

      # Replay message from console history
      CONSOLE_REPLAY = <<-JS
        (function (history) {
          if (history && history.length > 0) {
            result += '\\n<scr'+'ipt>';
            history.forEach(function (msg) {
              result += '\\nconsole.' + msg.level + '.apply(console, ' + JSON.stringify(msg.arguments) + ');';
            });
            result += '\\n</scr'+'ipt>';
          }
        })(console.history);
      JS
    end
  end
end
