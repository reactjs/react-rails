require File.expand_path('../boot', __FILE__)

# Pick the frameworks you want:
# require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"

# Test no-sprockets environment by testing the gemfile name
SKIP_SPROCKETS = ENV["BUNDLE_GEMFILE"] =~ /no_sprockets/
if !SKIP_SPROCKETS
  require "sprockets/railtie"
end

require "rails/test_unit/railtie"

# Make sure gems in development group are required, for example, react-rails and turbolinks.
# These gems are specified in .gemspec file by add_development_dependency. They are not runtime
# dependencies for react-rails project but probably runtime dependencies for this dummy rails app.
Bundler.require(*(Rails.groups | ['development']))

module Dummy
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de
    config.react.variant = :production
    config.react.addons = false
    if !SKIP_SPROCKETS
      config.assets.enabled = true
    end
  end
end
