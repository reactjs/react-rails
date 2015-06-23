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
        variant = app.config.react.variant == :production ? 'production' : 'development'
        variant += '-with-addons' if app.config.react.addons

        app.assets.version = [
          app.assets.version,
          "react-#{variant}",
        ].compact.join('-')
      end

      config.before_initialize do |app|
        # We want to include different files in dev/prod. The development builds
        # contain console logging for invariants and logging to help catch
        # common mistakes. These are all stripped out in the production build.
        root_path = Pathname.new('../../../../').expand_path(__FILE__)
        directory = app.config.react.variant == :production ? 'production' : 'development'
        directory += '-with-addons' if app.config.react.addons

        app.config.assets.paths << root_path.join('lib/assets/react-source/').join(directory).to_s
        app.config.assets.paths << root_path.join('lib/assets/javascripts/').to_s
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
