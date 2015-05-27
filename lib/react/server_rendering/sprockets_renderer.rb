module React
  module ServerRendering
    class SprocketsRenderer
      def initialize(options={})
        @replay_console = options.fetch(:replay_console, true)

        filenames = options.fetch(:files, ["react.js", "components.js"])
        js_code = GLOBAL_WRAPPER + CONSOLE_POLYFILL

        filenames.each do |filename|
          js_code << ::Rails.application.assets[filename].to_s
        end

        @context = ExecJS.compile(js_code)
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

        js_code = <<-JS
          (function () {
            var result = React.#{react_render_method}(React.createElement(#{component_name}, #{props}));
            #{@replay_console ? CONSOLE_REPLAY : ""}
            return result;
          })()
        JS

        @context.eval(js_code).html_safe
      rescue ExecJS::ProgramError => err
        raise PrerenderError.new(component_name, props, err)
      end

      # Handle node.js & other RubyRacer contexts
      GLOBAL_WRAPPER = <<-JS
      var global = global || this;
      var self = self || this;
      var window = window || this;
      JS

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

      class PrerenderError < RuntimeError
        def initialize(component_name, props, js_message)
          message = ["Encountered error \"#{js_message}\" when prerendering #{component_name} with #{props}",
                      js_message.backtrace.join("\n")].join("\n")
          super(message)
        end
      end
    end
  end
end
