require 'rails'

module React
  module Rails
    class Railtie < ::Rails::Railtie
      config.react = ActiveSupport::OrderedOptions.new

      # Sensible defaults. Can be overridden in application.rb
      config.react.variant = (::Rails.env.production? ? :production : :development)
      config.react.addons = false

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
        # e.g. /vendor/assets/react/react.js
        dropin_path_env = app.root.join("vendor/assets/react/#{app.config.react.variant}")
        app.assets.prepend_path dropin_path_env if dropin_path_env.exist?

      end
    end
  end
end
