# Configure Rails Environment
ENV["RAILS_ENV"] = "test"

require File.expand_path("../dummy/config/environment.rb",  __FILE__)
require "rails/test_help"
require "rails/generators"
require "pathname"
require 'minitest/mock'

CACHE_PATH = Pathname.new File.expand_path("../dummy/tmp/cache",  __FILE__)

Rails.backtrace_cleaner.remove_silencers!

def clear_sprockets_cache
  # Remove cached files
  Rails.root.join('tmp/cache').tap do |tmp|
    tmp.rmtree if tmp.exist?
    tmp.mkpath
  end
end

# Sprockets 2 doesn't expire this assets well in
# this kind of setting,
# so override `fresh?` to mark it as expired.
def manually_expire_asset(asset_name)
  asset = Rails.application.assets[asset_name]
  def asset.fresh?(env); false; end
end

# Load support files
Dir["#{File.dirname(__FILE__)}/support/**/*.rb"].each { |f| require f }

# Load fixtures from the engine
if ActiveSupport::TestCase.method_defined?(:fixture_path=)
  ActiveSupport::TestCase.fixture_path = File.expand_path("../fixtures", __FILE__)
end

def wait_for_turbolinks_to_be_available
  sleep(1)
end
