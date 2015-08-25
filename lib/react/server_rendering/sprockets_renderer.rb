
require 'multi_json'

# Extends ExecJSRenderer for the Rails environment
# - builds JS code out of the asset pipeline
# - stringifies props
# - implements console replay
module React
  module ServerRendering
    class SprocketsRenderer < ExecJSRenderer
      def initialize(options={})
        @replay_console = options.fetch(:replay_console, true)
        filenames = options.fetch(:files, ["react.js", "components.js"])
        js_code = CONSOLE_POLYFILL.dup

        filenames.each do |filename|
          js_code << ::Rails.application.assets[filename].to_s
        end

        @manifest_base ||= File.join(::Rails.public_path, ::Rails.application.config.assets.prefix)
        load_asset_on_init

        super(options.merge(code: js_code))
      end

      def render(component_name, props, prerender_options)
        if prerender_options.is_a?(Hash)
          @controller_path = prerender_options.fetch(:controller_path)
        else
          @controller_path = nil 
        end

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

      # When server rendering, we dont include the components in
      # `components.js`
      def before_render(component_name, props, prerender_options)
        if @controller_path.nil?
          return 
        end

        jscode = ''

        success = false
        # In production environment, load component from static
        if ::Rails.env.production?
          content, success = load_asset(entry)
        end

        if not success
          jscode << ::Rails.application.assets[entry].to_s
        else 
          jscode << content
        end

        jscode
      end

      def after_render(component_name, props, prerender_options)
        @replay_console ? CONSOLE_REPLAY : ""
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

      private 

      def entry
        components = 'components'
        path = @controller_path.to_s.split('.').join('_')
        File.join(components, "#{path}.ssr.js")
      end

      # Return asset content
      def load_asset(filename)
        digest_path = assets[filename]

        if digest_path.nil?
          return '', false 
        end

        file = File.join(@manifest_base, digest_path)
        if not File.exist?(file)
          return '', false 
        end

        return File.read(file), true
      end

      def assets
        @data['assets'] ||= {}
      end

      def files
        @data['files'] ||= {}
      end

      def load_asset_on_init
        paths = Dir[File.join(@manifest_base, "manifest*.json")]
        if paths.any?
          path = paths.first
        else 
          paths = File.join(@manifest_base, "manifest.yml")
          if !File.exist?(paths)
            # No precompile
            return {}
          end
          
          data = ::YAML::load(File.read(paths))
          @data = data.is_a?(Hash) ? data : {}
          return @data
        end

        begin
          if File.exist?(path)
            data = json_decode(File.read(path))
          end
        rescue ::MultiJson::DecodeError => e
          return {}
        end

        @data = data.is_a?(Hash) ? data : {}
      end

      if ::MultiJson.respond_to?(:dump)
        def json_decode(obj)
          ::MultiJson.load(obj)
        end
      else
        def json_decode(obj)
          ::MultiJson.decode(obj)
        end
      end
    end
  end
end
