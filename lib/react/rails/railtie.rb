require 'rails'

module React
  module Rails
    class Railtie < ::Rails::Railtie
      config.react = ActiveSupport::OrderedOptions.new

      # Sensible defaults. Can be overridden in application.rb
      config.react.variant = (::Rails.env.production? ? :production : :development)
      config.react.addons = false
      # Server-side rendering
      config.react.max_renderers = 10
      config.react.timeout = 20 #seconds
      config.react.react_js = lambda {File.read(::Rails.application.assets.resolve('react.js'))}
      config.react.component_filenames = ['components.js']

      # Watch .jsx files for changes in dev, so we can reload the JS VMs with the new JS code.
      initializer "react_rails.add_watchable_files" do |app|
        app.config.watchable_files.concat Dir["#{app.root}/app/assets/javascripts/**/*.jsx*"]
      end

      # run after all initializers to allow sprockets to pick up react.js and
      # jsxtransformer.js from end-user to override ours if needed
      initializer "react_rails.setup_vendor", :after => "sprockets.environment" do |app|
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
        app.config.react.components_js = app.config.react.component_filenames.map do |filename|
          app.assets[filename].to_s
        end.join(";")

        do_setup = lambda do
          cfg = app.config.react
          React::Renderer.setup!( cfg.react_js.call, cfg.components_js,
                                {:size => cfg.size, :timeout => cfg.timeout})
        end

        do_setup.call

        # Reload the JS VMs in dev when files change
        ActionDispatch::Reloader.to_prepare(&do_setup)
      end


    end
  end
end
