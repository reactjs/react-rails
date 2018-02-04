module React
  module ServerRendering
    # A bare-bones renderer for React.js + Exec.js
    # - Depends on global ReactRailsUJS in the ExecJS context
    # - No Rails dependency
    # - No browser concerns
    class ExecJSRenderer
      # @return [ExecJS::Runtime::Context] The JS context for this renderer
      attr_reader :context

      def initialize(options={})
        js_code = options[:code] || raise('Pass `code:` option to instantiate a JS context!')
        @context = ExecJS.compile(GLOBAL_WRAPPER + js_code)
      end

      def render(component_name, props, prerender_options)
        js_executed_before = before_render(component_name, props, prerender_options)
        js_executed_after = after_render(component_name, props, prerender_options)
        js_main_section = main_render(component_name, props, prerender_options)
        render_from_parts(js_executed_before, js_main_section, js_executed_after)
      rescue ExecJS::ProgramError => err
        raise React::ServerRendering::PrerenderError.new(component_name, props, err)
      end

      # Hooks for inserting JS before/after rendering
      def before_render(component_name, props, prerender_options); ''; end
      def after_render(component_name, props, prerender_options); ''; end

      # Handle Node.js & other ExecJS contexts
      GLOBAL_WRAPPER = <<-JS
        var global = global || this;
        var self = self || this;
      JS

      private

      def render_from_parts(before, main, after)
        js_code = compose_js(before, main, after)
        @context.eval(js_code).html_safe
      end

      def main_render(component_name, props, prerender_options)
        render_function = prerender_options.fetch(:render_function, 'renderToString')
        "this.ReactRailsUJS.serverRender('#{render_function}', '#{component_name}', #{props})"
      end

      def compose_js(before, main, after)
        <<-JS
          (function () {
            #{before}
            var result = #{main};
            #{after}
            return result;
          })()
        JS
      end
    end
  end
end
