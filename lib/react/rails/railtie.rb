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
      config.react.component_filenames = ['components.js']

      # Add a custom file reloader middleware
      initializer "react_rails.configure_reloader" do |app|
        app.middleware.use React::Rails::Reloader
      end

      # Include the react-rails view helper lazily
      initializer "react_rails.setup_view_helpers" do |app|
        React::JSX.transform_options = app.config.react.jsx_transform_options
        ActiveSupport.on_load(:action_view) do
          include ::React::Rails::ViewHelper
        end
      end

      # run after all initializers to allow sprockets to pick up react.js and
      # jsxtransformer.js from end-user to override ours if needed
      initializer "react_rails.setup_vendor", :after => "sprockets.environment", group: :all do |app|
        # Mimic behavior of ember-rails...
        # We want to include different files in dev/prod. The unminified builds
        # contain console logging for invariants and logging to help catch
        # common mistakes. These are all stripped out in the minified build.

        # Copy over the variant into a path that sprockets will pick up.
        # We'll always copy to 'react.js' so that no includes need to change.
        # We'll also always copy of JSXTransformer.js
        tmp_path = app.root.join('tmp/react-rails')
        filename = 'react' +
                   (app.config.react.addons ? '-with-addons' : '') +
                   (app.config.react.variant == :production ? '.min.js' : '.js')
        FileUtils.mkdir_p(tmp_path)
        FileUtils.cp(::React::Source.bundled_path_for(filename),
                     tmp_path.join('react.js'))
        FileUtils.cp(::React::Source.bundled_path_for('JSXTransformer.js'),
                     tmp_path.join('JSXTransformer.js'))
        app.assets.prepend_path tmp_path

        # Allow overriding react files that are not based on environment
        # e.g. /vendor/assets/react/JSXTransformer.js
        dropin_path = app.root.join("vendor/assets/react")
        app.assets.prepend_path dropin_path if dropin_path.exist?

        # Allow overriding react files that are based on environment
        # e.g. /vendor/assets/react/development/react.js
        dropin_path_env = app.root.join("vendor/assets/react/#{app.config.react.variant}")
        app.assets.prepend_path dropin_path_env if dropin_path_env.exist?
      end


      config.after_initialize do |app|
        # Server Rendering

        # Concat component_filenames together for server rendering
        combined_components_source = lambda {
          app.config.react.component_filenames.map do |filename|
            app.assets[filename].to_s
          end.join(";")
        }

        watchable_files = lambda {
          app.config.react.component_filenames.flat_map { |filename|
            asset = app.assets[filename]
            [asset.pathname.to_s] + asset.dependencies.map(&:pathname).map(&:to_s)
          }.uniq
        }

        react_source = lambda { File.read(app.assets.resolve('react.js')) }

        setup_renderer = lambda do
          cfg = app.config.react
          React::Renderer.setup!( react_source, combined_components_source,
                                {:size => cfg.size, :timeout => cfg.timeout})

          # Update the watch file list with the latest set of dependencies
          if app.config.reload_classes_only_on_change
            React::Rails::Reloader.on_change(watchable_files.call, &setup_renderer)
          end
        end

        setup_renderer.call
      end


    end
  end
end
