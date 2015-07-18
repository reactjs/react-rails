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
      # Server rendering:
      config.react.server_renderer_pool_size  = 1   # increase if you're on JRuby
      config.react.server_renderer_timeout    = 20  # seconds
      config.react.server_renderer            = nil # defaults to SprocketsRenderer
      config.react.server_renderer_options    = {}  # SprocketsRenderer provides defaults

      # Watch .jsx files for changes in dev, so we can reload the JS VMs with the new JS code.
      initializer "react_rails.add_watchable_files", group: :all do |app|
        app.config.watchable_files.concat Dir["#{app.root}/app/assets/javascripts/**/*.jsx*"]
      end

      # Include the react-rails view helper lazily
      initializer "react_rails.setup_view_helpers", group: :all do |app|
        app.config.react.jsx_transformer_class ||= React::JSX::DEFAULT_TRANSFORMER
        React::JSX.transformer_class = app.config.react.jsx_transformer_class
        React::JSX.transform_options = app.config.react.jsx_transform_options

        ActiveSupport.on_load(:action_view) do
          include ::React::Rails::ViewHelper
        end
      end

      initializer "react_rails.bust_cache", group: :all do |app|
        asset_variant = React::Rails::AssetVariant.new({
          variant: app.config.react.variant,
          addons: app.config.react.addons,
        })

        if app.assets.nil?
          app.config.assets.version = [app.config.assets.version, "react-#{asset_variant.react_build}",].compact.join('-')
        else
          app.assets.version = [app.assets.version, "react-#{asset_variant.react_build}",].compact.join('-')
        end

      end

      config.before_initialize do |app|
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
    end
  end
end
