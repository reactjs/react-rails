if RUBY_PLATFORM != "java"
  require 'simplecov'
  SimpleCov.start
end

# Configure Rails Environment
ENV["RAILS_ENV"] = "test"

require File.expand_path("../dummy/config/environment.rb", __FILE__)
require "rails/test_help"
require "rails/generators"
require "pathname"
require 'minitest/mock'
require "capybara/rails"
require "capybara/poltergeist"
Dummy::Application.load_tasks

support_path = File.expand_path("../support/*.rb", __FILE__)
Dir.glob(support_path).each do |f|
  require(f)
end

Capybara.javascript_driver = :poltergeist
Capybara.app = Rails.application

Capybara.register_driver :poltergeist_debug do |app|
  poltergeist_options = {
    # `page.driver.debug` will cause Poltergeist to open a browser window
    inspector: true,
    # hide warnings from React.js whitespace changes:
    js_errors: false,
  }
  Capybara::Poltergeist::Driver.new(app, poltergeist_options)
end
Capybara.javascript_driver = :poltergeist_debug


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
  capture_io do
    ENV['RAILS_GROUPS'] = 'assets' # required for Rails 3.2
    Rake::Task['assets:precompile'].reenable

    if Rails::VERSION::MAJOR == 3
      Rake::Task['assets:precompile:all'].reenable
      Rake::Task['assets:precompile:primary'].reenable
      Rake::Task['assets:precompile:nondigest'].reenable
    end

    Rake::Task['assets:precompile'].invoke
  end

  if Rails.application.respond_to?(:assets_manifest)
    # Make a new manifest since assets weren't compiled before
    config = Rails.application.config
    path = File.join(config.paths['public'].first, config.assets.prefix)
    new_manifest = Sprockets::Manifest.new(Rails.application.assets, path)
    Rails.application.assets_manifest = new_manifest
  end

  assets_directory = File.expand_path("../dummy/public/assets", __FILE__)
  raise "Asset precompilation failed" unless Dir.exists?(assets_directory)
end

def clear_precompiled_assets
  assets_directory = File.expand_path("../dummy/public/assets", __FILE__)
  FileUtils.rm_r(assets_directory)
  ENV.delete('RAILS_GROUPS')
end

# Rails 3.2's version of MiniTest does not have `capture_io` defined. For
# consistency across multiple versions we've defined that method here.
#
def capture_io
  require 'stringio'

  orig_stdout, orig_stderr         = $stdout, $stderr
  captured_stdout, captured_stderr = StringIO.new, StringIO.new
  $stdout, $stderr                 = captured_stdout, captured_stderr

  yield

  return captured_stdout.string, captured_stderr.string
ensure
  $stdout = orig_stdout
  $stderr = orig_stderr
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


# The block depends on sprockets, don't run it if sprockets is missing
def when_sprockets_available
  if !SKIP_SPROCKETS
    yield
  end
end

def fetch_asset_body(asset_logical_path)
  Rails.application.assets[asset_logical_path].to_s
end

# Different processors may generate slightly different outputs,
# as some version inserts an extra "\n" at the beginning.
# Because appraisal is used, multiple versions of coffee-script are treated
# together. Remove all spaces to make test pass.
def assert_compiled_javascript_matches(javascript, expectation)
  assert_equal expectation.gsub(/\s/, ''), javascript.gsub(/\s/, '')
end

def assert_compiled_javascript_includes(javascript, expected_part)
  assert_includes javascript.gsub(/\s/, ''), expected_part.gsub(/\s/, '')
end

def when_stateful_js_context_available
  if defined?(V8) || defined?(MiniRacer)
    yield
  end
end
