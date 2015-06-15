module React
  module ServerRendering
    class ExecJSRenderer
      def initialize(options={})
        js_code = options.fetch(:code) || raise("Pass `code:` option to instantiate a JS context!")
        @context = ExecJS.compile(js_code)
      end

      def render(component_name, props, prerender_options)
        js_code = <<-JS
          (function () {
            var result = React.renderToString(React.createElement(#{component_name}, #{props}));
            return result;
          })()
        JS

        @context.eval(js_code)
      rescue ExecJS::ProgramError => err
        raise PrerenderError.new(component_name, props, err)
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
end
