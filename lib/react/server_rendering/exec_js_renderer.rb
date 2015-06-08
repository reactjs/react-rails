# A bare-bones renderer for React.js + Exec.js
# - No Rails dependency
# - No browser concerns
module React
  module ServerRendering
    class ExecJSRenderer
      def initialize(options={})
        js_code = options.fetch(:code) || raise("Pass `code:` option to instantiate a JS context!")
        @context = ExecJS.compile(GLOBAL_WRAPPER + js_code)
      end

      def render(component_name, props, prerender_options)
        render_function = prerender_options.fetch(:render_function, "renderToString")
        js_code = <<-JS
          (function () {
            #{before_render}
            var result = React.#{render_function}(React.createElement(#{component_name}, #{props}));
            #{after_render}
            return result;
          })()
        JS
        @context.eval(js_code)
      rescue ExecJS::ProgramError => err
        raise React::ServerRendering::PrerenderError.new(component_name, props, err)
      end

      # Hooks for inserting JS before/after rendering
      def before_render; ""; end
      def after_render; ""; end

      # Handle Node.js & other ExecJS contexts
      GLOBAL_WRAPPER = <<-JS
        var global = global || this;
        var self = self || this;
        var window = window || this;
      JS

    end
  end
end
