require 'react/server_rendering/environment_container'
require 'react/server_rendering/manifest_container'
require 'react/server_rendering/webpacker_manifest_container'
require 'react/server_rendering/yaml_manifest_container'

module React
  module ServerRendering
    # Extends ExecJSRenderer for the Rails environment
    # - fetches JS code from the Rails app (webpacker or sprockets)
    # - stringifies props
    # - implements console replay
    class BundleRenderer < ExecJSRenderer
      # Reimplement console methods for replaying on the client
      CONSOLE_POLYFILL = File.read(File.join(File.dirname(__FILE__), 'bundle_renderer/console_polyfill.js'))
      CONSOLE_REPLAY   = File.read(File.join(File.dirname(__FILE__), 'bundle_renderer/console_replay.js'))
      CONSOLE_RESET    = File.read(File.join(File.dirname(__FILE__), 'bundle_renderer/console_reset.js'))
      TIMEOUT_POLYFILL = File.read(File.join(File.dirname(__FILE__), 'bundle_renderer/timeout_polyfill.js'))

      def initialize(options={})
        @replay_console = options.fetch(:replay_console, true)
        filenames = options.fetch(:files, ['server_rendering.js'])
        js_code = CONSOLE_POLYFILL.dup
        js_code << TIMEOUT_POLYFILL.dup
        js_code << options.fetch(:code, '')

        filenames.each do |filename|
          js_code << asset_container.find_asset(filename)
        end

        super(options.merge(code: js_code))
      end

      # Prerender options are expected to be a Hash however might also be a symbol.
      # pass prerender: :static to use renderToStaticMarkup
      # pass prerender: true to enable default prerender
      # pass prerender: {} to proxy some custom options
      def render(component_name, props, prerender_options)
        t_options = prepare_options(prerender_options)
        t_props = prepare_props(props)
        super(component_name, t_props, t_options)
      end

      def before_render(component_name, props, prerender_options)
        @replay_console ? CONSOLE_RESET : ''
      end

      def after_render(component_name, props, prerender_options)
        @replay_console ? CONSOLE_REPLAY : ''
      end

      class << self
        attr_accessor :asset_container_class
      end

      # Get an object which exposes assets by their logical path.
      #
      # Out of the box, it supports a Sprockets::Environment (application.assets)
      # and a Sprockets::Manifest (application.assets_manifest), which covers the
      # default Rails setups.
      #
      # You can provide a custom asset container
      # with `React::ServerRendering::BundleRenderer.asset_container_class = MyAssetContainer`.
      #
      # @return [#find_asset(logical_path)] An object that returns asset contents by logical path
      def asset_container
        @asset_container ||= asset_container_class.new
      end

      private

      def prepare_options(options)
        r_func = render_function(options)
        opts = case options
          when Hash then options
          when TrueClass then {}
          else
            {}
        end
        # This seems redundant to pass
        opts.merge(render_function: r_func)
      end

      def render_function(opts)
        if opts == :static
          'renderToStaticMarkup'.freeze
        else
          'renderToString'.freeze
        end
      end

      def prepare_props(props)
        props.is_a?(String) ? props : props.to_json
      end

      def assets_precompiled?
        !::Rails.application.config.assets.compile
      end

      # Detect what kind of asset system is in use and choose that container.
      # Or, if the user has provided {.asset_container_class}, use that.
      # @return [Class] suitable for {#asset_container}
      def asset_container_class
        if self.class.asset_container_class.present?
          self.class.asset_container_class
        elsif WebpackerManifestContainer.compatible?
          WebpackerManifestContainer
        elsif assets_precompiled?
          if ManifestContainer.compatible?
            ManifestContainer
          elsif YamlManifestContainer.compatible?
            YamlManifestContainer
          else
            # Even though they are precompiled, we can't find them :S
            EnvironmentContainer
          end
        else
          EnvironmentContainer
        end
      end
    end
  end
end
