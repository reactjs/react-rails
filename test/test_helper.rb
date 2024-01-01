# frozen_string_literal: true

if RUBY_PLATFORM != "java"
  require "simplecov"
  SimpleCov.start
end

DUMMY_LOCATION = "dummy"

support_path = File.expand_path("support/*.rb", __dir__)
Dir.glob(support_path).sort.each do |f|
  require(f)
end

# Configure Rails Environment
ENV["RAILS_ENV"] = "test"

require File.expand_path("../#{DUMMY_LOCATION}/config/environment.rb", __FILE__)
require "rails/test_help"
require "rails/generators"
require "pathname"
require "minitest/mock"
require "capybara/rails"
require "selenium/webdriver"
Dummy::Application.load_tasks

ShakapackerHelpers.clear_shakapacker_packs

Capybara.app = Rails.application
Capybara.server = :webrick

Capybara.register_driver :headless_chrome do |app|
  options = Selenium::WebDriver::Chrome::Options.new(args: %w[no-sandbox headless disable-gpu], w3c: false)

  Capybara::Selenium::Driver.new(app, browser: :chrome, options: options)
end

Capybara.javascript_driver = :headless_chrome
Capybara.current_driver = Capybara.javascript_driver

CACHE_PATH = Pathname.new File.expand_path("../#{DUMMY_LOCATION}/tmp/cache", __FILE__)

Rails.backtrace_cleaner.remove_silencers!

def reset_transformer
  SprocketsHelpers.clear_sprockets_cache
  React::JSX.transformer_class = React::JSX::DEFAULT_TRANSFORMER
  React::JSX.transform_options = {}
  React::JSX.transformer = nil
end

# Load support files
Dir["#{File.dirname(__FILE__)}/support/**/*.rb"].sort.each { |f| require f }

# Load fixtures from the engine
if ActiveSupport::TestCase.method_defined?(:fixture_path=)
  ActiveSupport::TestCase.fixture_path = File.expand_path("fixtures", __dir__)
end

ActiveSupport::TestCase.test_order = :random if ActiveSupport::TestCase.respond_to?(:test_order=)

def wait_for_turbolinks_to_be_available
  sleep(1)
end

# Different processors may generate slightly different outputs,
# as some version inserts an extra "\n" at the beginning.
# Because appraisal is used, multiple versions of coffee-script are treated
# together. Remove all spaces to make test pass.
def assert_compiled_javascript_matches(javascript, expectation)
  assert_equal expectation.gsub(/\s/, ""), javascript.gsub(/\s/, "")
end

def assert_compiled_javascript_includes(javascript, expected_part)
  assert_includes javascript.gsub(/\s/, ""), expected_part.gsub(/\s/, "")
end

def when_stateful_js_context_available
  return unless defined?(V8) || defined?(MiniRacer)

  yield
end

def expected_working_jsx
  /\.createElement\(\s*\S*\.Fragment,\s*null,\s*"Name:\s*",\s*this\.props\.name,\s*"Address:\s*",\s*this\.props\.address\s*\)/x # rubocop:disable Layout/LineLength
end

def expected_working_jsx_in_function_component
  /\.createElement\(\s*\S*\.Fragment,\s*null,\s*"Name:\s*",\s*props\.name,\s*"Address:\s*",\s*props\.address\s*\)/x
end

module ParamsHelper
  # Normalize params for Rails 5.1+
  def query_params(params)
    if Rails::VERSION::MAJOR > 4
      { params: params }
    else
      params
    end
  end
end
