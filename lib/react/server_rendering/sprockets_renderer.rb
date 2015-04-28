module React
  module ServerRendering
    class SprocketsRenderer
      def initialize(options={})
        filenames = options.fetch(:setup, ["react.js", "components.js"])
        @replay_console = options.fetch(:replay_console, true)

        js_code = SetupJavascript.new(filenames).to_s
        @context = ExecJS.compile(js_code)
      end

      def render(component_name, props)
        if !props.is_a?(String)
          props = props.to_json
        end
        js_code = <<-JS
          (function () {
            var result = React.renderToString(React.createElement(#{component_name}, #{props}));
            return result;
          })()
        JS
        @context.eval(js_code).html_safe
      # handle error
      end

      class SetupJavascript
        GLOBAL_WRAPPER = <<-JS
        var global = global || this;
        var self = self || this;
        var window = window || this;
        JS
        def initialize(filenames)
          js_code = ""
          filenames.each do |filename|
            js_code << ::Rails.application.assets[filename].to_s
          end
          @wrapped_code = GLOBAL_WRAPPER + js_code
        end

        def to_s
          @wrapped_code
        end
      end
    end
  end
end
