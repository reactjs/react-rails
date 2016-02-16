if RUBY_PLATFORM != "java"
  require "codeclimate-test-reporter"
  CodeClimate::TestReporter.start
end

# Configure Rails Environment
ENV["RAILS_ENV"] = "test"

require File.expand_path("../dummy/config/environment.rb", __FILE__)
require "rails/test_help"
require "rails/generators"
require "pathname"
require 'minitest/mock'

CACHE_PATH = Pathname.new File.expand_path("../dummy/tmp/cache", __FILE__)

Rails.backtrace_cleaner.remove_silencers!

def clear_sprockets_cache
  # Remove cached files
  Rails.root.join('tmp/cache').tap do |tmp|
    tmp.rmtree if tmp.exist?
    tmp.mkpath
  end
end

def reset_transformer
  clear_sprockets_cache
  React::JSX.transformer_class = React::JSX::DEFAULT_TRANSFORMER
  React::JSX.transform_options = {}
  React::JSX.transformer = nil
end

# Sprockets 2 doesn't expire this assets well in
# this kind of setting,
# so override `fresh?` to mark it as expired.
def manually_expire_asset(asset_name)
  asset = Rails.application.assets[asset_name]
  def asset.fresh?(env); false; end
end

def precompile_assets
  ENV['RAILS_GROUPS'] = 'assets' # required for Rails 3.2
  Dummy::Application.load_tasks
  Rake::Task['assets:precompile'].reenable
  Rake::Task['assets:precompile'].invoke
end

def clear_precompiled_assets
  assets_directory = File.expand_path("../dummy/public/assets", __FILE__)
  FileUtils.rm_r(assets_directory)
  ENV.delete('RAILS_GROUPS')
end

# Load support files
Dir["#{File.dirname(__FILE__)}/support/**/*.rb"].each { |f| require f }

# Load fixtures from the engine
if ActiveSupport::TestCase.method_defined?(:fixture_path=)
  ActiveSupport::TestCase.fixture_path = File.expand_path("../fixtures", __FILE__)
end

if ActiveSupport::TestCase.respond_to?(:test_order=)
  ActiveSupport::TestCase.test_order = :random
end

def wait_for_turbolinks_to_be_available
  sleep(1)
end
