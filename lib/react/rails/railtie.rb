require 'rails'

module React
  module Rails
    class Railtie < ::Rails::Railtie
      config.react = ActiveSupport::OrderedOptions.new
      # Sensible defaults. Can be overridden in application.rb
      config.react.variant = (::Rails.env.production? ? :production : :development)
      config.react.addons = false
      config.react.jsx_transform_options = {}
      config.react.jsx_transformer_class = nil # defaults to BabelTransformer
      config.react.camelize_props = false # pass in an underscored hash but get a camelized hash

      # Server rendering:
      config.react.server_renderer_pool_size  = 1   # increase if you're on JRuby
      config.react.server_renderer_timeout    = 20  # seconds
      config.react.server_renderer            = nil # defaults to SprocketsRenderer
      config.react.server_renderer_options    = {}  # SprocketsRenderer provides defaults
      # View helper implementation:
      config.react.view_helper_implementation = nil # Defaults to ComponentMount

      # Watch .jsx files for changes in dev, so we can reload the JS VMs with the new JS code.
      initializer "react_rails.add_watchable_files", group: :all do |app|
        app.config.watchable_files.concat Dir["#{app.root}/app/assets/javascripts/**/*.jsx*"]
      end

      # Include the react-rails view helper lazily
      initializer "react_rails.setup_view_helpers", group: :all do |app|

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

      initializer "react_rails.add_component_renderer", group: :all do |app|
        ActionController::Renderers.add :component do |component_name, options|
          renderer = ::React::Rails::ControllerRenderer.new(controller: self)
          html = renderer.call(component_name, options)
          render_options = options.merge(inline: html)
          render(render_options)
        end
      end

      initializer "react_rails.bust_cache", group: :all do |app|
        asset_variant = React::Rails::AssetVariant.new({
          variant: app.config.react.variant,
          addons: app.config.react.addons,
        })

        sprockets_env = app.assets || app.config.assets # sprockets-rails 3.x attaches this at a different config
        sprockets_env.version = [sprockets_env.version, "react-#{asset_variant.react_build}",].compact.join('-')

      end

      initializer "react_rails.set_variant", after: :engines_blank_point, group: :all do |app|
        asset_variant = React::Rails::AssetVariant.new({
          variant: app.config.react.variant,
          addons: app.config.react.addons,
        })

        app.config.assets.paths << asset_variant.react_directory
        app.config.assets.paths << asset_variant.jsx_directory
      end

      config.after_initialize do |app|
        # The class isn't accessible in the configure block, so assign it here if it wasn't overridden:
        app.config.react.server_renderer ||= React::ServerRendering::SprocketsRenderer

        React::ServerRendering.pool_size        = app.config.react.server_renderer_pool_size
        React::ServerRendering.pool_timeout     = app.config.react.server_renderer_timeout
        React::ServerRendering.renderer_options = app.config.react.server_renderer_options
        React::ServerRendering.renderer         = app.config.react.server_renderer

        React::ServerRendering.reset_pool
        # Reload renderers in dev when files change
        ActionDispatch::Reloader.to_prepare { React::ServerRendering.reset_pool }
      end

      initializer "react_rails.setup_engine", :group => :all do |app|
        sprockets_env = app.assets || Sprockets # Sprockets 3.x expects this in a different place
        if Gem::Version.new(Sprockets::VERSION) >= Gem::Version.new("3.0.0")
          sprockets_env.register_mime_type("application/jsx", extensions: [".jsx", ".js.jsx", ".es.jsx", ".es6.jsx"])
          sprockets_env.register_transformer("application/jsx", "application/javascript", React::JSX::Processor)
        else
          sprockets_env.register_engine(".jsx", React::JSX::Template)
        end
      end
    end
  end
end
