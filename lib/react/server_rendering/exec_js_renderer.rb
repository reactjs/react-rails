# A bare-bones renderer for React.js + Exec.js
# - Depends on global ReactDOMServer in the ExecJS context
# - No Rails dependency
# - No browser concerns
module React
  module ServerRendering
    class ExecJSRenderer
      def initialize(options={})
        js_code = options[:code] || raise("Pass `code:` option to instantiate a JS context!")
        @context = ExecJS.compile(GLOBAL_WRAPPER + js_code)
      end

      def render(component_name, props, prerender_options)
        # pass prerender: :static to use renderToStaticMarkup
        render_function = if prerender_options == :static
            "renderToStaticMarkup"
          else
            "renderToString"
          end

        if !props.is_a?(String)
          props = props.to_json
        end

        js_code = <<-JS
          (function () {
            #{before_render(component_name, props, prerender_options)}
            var result = ReactDOMServer.#{render_function}(React.createElement(#{component_name}, #{props}));
            #{after_render(component_name, props, prerender_options)}
            return result;
          })()
        JS
        @context.eval(js_code).html_safe
      rescue ExecJS::ProgramError => err
        raise React::ServerRendering::PrerenderError.new(component_name, props, err)
      end

      # Hooks for inserting JS before/after rendering
      def before_render(component_name, props, prerender_options); ""; end
      def after_render(component_name, props, prerender_options); ""; end

      # Handle Node.js & other ExecJS contexts
      GLOBAL_WRAPPER = <<-JS
        var global = global || this;
        var self = self || this;
        var window = window || this;
      JS

    end
  end
end
