require 'rails'

module React
  module Rails
    class Railtie < ::Rails::Railtie
      config.react = ActiveSupport::OrderedOptions.new

      # Sensible defaults. Can be overridden in application.rb
      config.react.variant = (::Rails.env.production? ? :production : :development)
      config.react.addons = false
      config.react.jsx_transform_options = {}
      # Server-side rendering
      config.react.max_renderers = 10
      config.react.timeout = 20 #seconds
      config.react.react_js = lambda {File.read(::Rails.application.assets.resolve('react.js'))}
      config.react.component_filenames = ['components.js']

      # Watch .jsx files for changes in dev, so we can reload the JS VMs with the new JS code.
      initializer "react_rails.add_watchable_files", group: :all do |app|
        app.config.watchable_files.concat Dir["#{app.root}/app/assets/javascripts/**/*.jsx*"]
      end

      # Include the react-rails view helper lazily
      initializer "react_rails.setup_view_helpers", group: :all do |app|
        React::JSX.transform_options = app.config.react.jsx_transform_options
        ActiveSupport.on_load(:action_view) do
          include ::React::Rails::ViewHelper
        end
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
        variant = app.config.react.variant == :production ? 'production' : 'development'
        variant += '-with-addons' if app.config.react.addons

        app.assets.version = [
          app.assets.version,
          "react-#{variant}",
        ].compact.join('-')

        # Server Rendering
        # Concat component_filenames together for server rendering
        app.config.react.components_js = lambda {
          app.config.react.component_filenames.map do |filename|
            app.assets[filename].to_s
          end.join(";")
        }

        do_setup = lambda do
          cfg = app.config.react
          React::Renderer.setup!( cfg.react_js, cfg.components_js, cfg.replay_console,
                                {:size => cfg.max_renderers, :timeout => cfg.timeout})
        end

        do_setup.call

        # Reload the JS VMs in dev when files change
        ActionDispatch::Reloader.to_prepare(&do_setup)
      end
    end
  end
end
