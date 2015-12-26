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
          js_code << get_asset_content(filename)
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

      # Given an asset name, return the fully-compiled body of that asset.
      #
      # Out of the box, it supports a Sprockets::Environment (application.assets)
      # and a Sprockets::Manifest (application.assets_manifest), which covers the
      # default Rails setups.
      #
      # Make a `server.js` which has `//= require react-server` and `//= require components`.
      # Then add `server` to the precompile list, eg `Rails.application.config.assets.precompile += %w( server.js )`.
      #
      # In production, react-rails will use the precompiled file.
      #
      # TODO: what if the assets aren't on the local server (maybe they're on a CDN?)
      # Can we check for asset_host configuration here?
      def get_asset_content(asset_name)
        if ::Rails.application.config.assets.compile
          ::Rails.application.assets[asset_name].to_s
        else
          manifest = ::Rails.application.assets_manifest
          # Find the corresponding compiled file:
          asset_path = manifest.assets[asset_name] || raise("No compiled asset for #{asset_name}, was it precompiled?")
          asset_full_path = ::Rails.root.join("public", manifest.directory, asset_path)
          File.read(asset_full_path)
        end
      end
    end
  end
end
