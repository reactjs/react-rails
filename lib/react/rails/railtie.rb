require 'rails'

module React
  module Rails
    class Railtie < ::Rails::Railtie
      config.react = ActiveSupport::OrderedOptions.new

      # run after all initializers to allow sprockets to pick up react.js and
      # jsxtransformer.js from end-user to override ours if needed
      config.after_initialize do |app|
        variant = app.config.react.variant

        # Mimic behavior of ember-rails...
        # We want to include different files in dev/prod. The unminified builds
        # contain console logging for invariants and logging to help catch
        # common mistakes. These are all stripped out in the minified build.
        if variant = app.config.react.variant || ::Rails.env.test?
          variant ||= :development
          addons = app.config.react.addons || false

          # Copy over the variant into a path that sprockets will pick up.
          # We'll always copy to 'react.js' so that no includes need to change.
          # We'll also always copy of JSXTransformer.js
          tmp_path = app.root.join('tmp/react-rails')
          filename = 'react' + (addons ? '-with-addons' : '') + (variant == :production ? '.min.js' : '.js')
          FileUtils.mkdir_p(tmp_path)
          FileUtils.cp(::React::Source.bundled_path_for(filename),
                       tmp_path.join('react.js'))
          FileUtils.cp(::React::Source.bundled_path_for('JSXTransformer.js'),
                       tmp_path.join('JSXTransformer.js'))
          app.assets.prepend_path tmp_path

          # Allow overriding react files that are not based on environment
          # e.g. /vendor/react/JSXTransformer.js
          dropin_path = app.root.join("vendor/assets/react")
          app.assets.prepend_path dropin_path if dropin_path.exist?

          # Allow overriding react files that are based on environment
          # e.g. /vendor/react/react.js
          dropin_path_env = app.root.join("vendor/assets/react/#{variant}")
          app.assets.prepend_path dropin_path_env if dropin_path_env.exist?
        end
      end
    end
  end
end
