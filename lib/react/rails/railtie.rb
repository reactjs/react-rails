require 'rails'

module React
  module Rails
    class Railtie < ::Rails::Railtie
      config.react = ActiveSupport::OrderedOptions.new
      # Sensible defaults. Can be overridden in application.rb
      config.react.variant = (::Rails.env.production? ? :production : :development)
      config.react.jsx_transform_options = {}
      config.react.jsx_transformer_class = nil # defaults to BabelTransformer
      config.react.camelize_props = false # pass in an underscored hash but get a camelized hash
      config.react.sprockets_strategy = nil # how to attach JSX to the asset pipeline (or `false` for none)

      # Server rendering:
      config.react.server_renderer_pool_size  = 1   # increase if you're on JRuby
      config.react.server_renderer_timeout    = 20  # seconds
      config.react.server_renderer            = nil # defaults to BundleRenderer
      config.react.server_renderer_options    = {}  # BundleRenderer provides defaults
      # Changing files with these extensions in these directories will cause the server renderer to reload:
      config.react.server_renderer_directories = ['/app/assets/javascripts/', 'app/javascript']
      config.react.server_renderer_extensions = ['jsx', 'js']
      # View helper implementation:
      config.react.view_helper_implementation = nil # Defaults to ComponentMount

      # Watch .jsx files for changes in dev, so we can reload the JS VMs with the new JS code.
      initializer 'react_rails.add_watchable_files', after: :load_config_initializers, group: :all do |app|
        # Watch files ending in `server_renderer_extensions` in each of `server_renderer_directories`
        reload_paths = config.react.server_renderer_directories.reduce({}) do |memo, dir|
          app_dir = File.join(app.root, dir)
          memo[app_dir] = config.react.server_renderer_extensions
          memo
        end

        # Rails checks these objects for changes:
        react_reloader = app.config.file_watcher.new([], reload_paths) do
          React::ServerRendering.reset_pool
        end
        app.reloaders << react_reloader

        # Reload renderers in dev when files change
        config.to_prepare { react_reloader.execute_if_updated }
      end

      # Include the react-rails view helper lazily
      initializer 'react_rails.setup_view_helpers', after: :load_config_initializers, group: :all do |app|

        app.config.react.jsx_transformer_class ||= React::JSX::DEFAULT_TRANSFORMER
        React::JSX.transformer_class = app.config.react.jsx_transformer_class
        React::JSX.transform_options = app.config.react.jsx_transform_options

        app.config.react.view_helper_implementation ||= React::Rails::ComponentMount
        React::Rails::ViewHelper.helper_implementation_class = app.config.react.view_helper_implementation
        React::Rails::ComponentMount.camelize_props_switch = app.config.react.camelize_props

        ActiveSupport.on_load(:action_controller) do
          include ::React::Rails::ControllerLifecycle
        end

        ActiveSupport.on_load(:action_view) do
          include ::React::Rails::ViewHelper
        end
      end

      initializer 'react_rails.add_component_renderer', group: :all do |app|
        ActionController::Renderers.add :component do |component_name, options|
          renderer = ::React::Rails::ControllerRenderer.new(controller: self)
          html = renderer.call(component_name, options)
          render_options = options.merge(inline: html)
          render(render_options)
        end
      end

      initializer 'react_rails.bust_cache', after: :load_config_initializers, group: :all do |app|
        asset_variant = React::Rails::AssetVariant.new({
          variant: app.config.react.variant,
        })

        sprockets_env = app.assets || app.config.try(:assets) # sprockets-rails 3.x attaches this at a different config
        unless sprockets_env.nil?
          sprockets_env.version = [sprockets_env.version, "react-#{asset_variant.react_build}"].compact.join('-')
        end

      end

      initializer 'react_rails.set_variant', after: :engines_blank_point, group: :all do |app|
        asset_variant = React::Rails::AssetVariant.new({
          variant: app.config.react.variant,
        })

        if app.config.respond_to?(:assets)
          app.config.assets.paths << asset_variant.react_directory
          app.config.assets.paths << asset_variant.jsx_directory
        end
      end

      config.after_initialize do |app|
        # The class isn't accessible in the configure block, so assign it here if it wasn't overridden:
        app.config.react.server_renderer ||= React::ServerRendering::BundleRenderer

        React::ServerRendering.pool_size        = app.config.react.server_renderer_pool_size
        React::ServerRendering.pool_timeout     = app.config.react.server_renderer_timeout
        React::ServerRendering.renderer_options = app.config.react.server_renderer_options
        React::ServerRendering.renderer         = app.config.react.server_renderer
        React::ServerRendering.reset_pool
      end

      initializer 'react_rails.setup_engine', :group => :all do |app|
        # Sprockets 3.x expects this in a different place
        sprockets_env = app.assets || defined?(Sprockets) && Sprockets

        if app.config.react.sprockets_strategy == false
          # pass, Sprockets opt-out
        elsif sprockets_env.present?
          React::JSX::SprocketsStrategy.attach_with_strategy(sprockets_env, app.config.react.sprockets_strategy)
        else
          # pass, Sprockets is not preset
        end
      end
    end
  end
end
