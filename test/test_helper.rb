if RUBY_PLATFORM != 'java'
  require 'simplecov'
  SimpleCov.start
end

DUMMY_LOCATION = if (gem_webpack = Bundler.locked_gems.specs.find { |gem_spec| gem_spec.name == 'webpacker' })
  if gem_webpack.version.segments.first == 1
    'dummy_webpacker1'
  elsif gem_webpack.version.segments.first == 2
    'dummy_webpacker2'
  else #if gem_webpack.version.segments.first == 3
    'dummy_webpacker3'
  end
else
  'dummy_sprockets'
end

support_path = File.expand_path('../support/*.rb', __FILE__)
Dir.glob(support_path).each do |f|
  require(f)
end

# Configure Rails Environment
ENV['RAILS_ENV'] = 'test'

require File.expand_path("../#{DUMMY_LOCATION}/config/environment.rb", __FILE__)
require 'rails/test_help'
require 'rails/generators'
require 'pathname'
require 'minitest/mock'
require 'capybara/rails'
require 'selenium/webdriver'
Dummy::Application.load_tasks

WebpackerHelpers.clear_webpacker_packs

Capybara.app = Rails.application
Capybara.server = :webrick

Capybara.register_driver :headless_chrome do |app|
  options = Selenium::WebDriver::Chrome::Options.new(args: %w[no-sandbox headless disable-gpu])

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

# Rails 3.2's version of MiniTest does not have `capture_io` defined. For
# consistency across multiple versions we've defined that method here.
#
def capture_io
  require 'stringio'

  orig_stdout = $stdout
  orig_stderr = $stderr
  captured_stdout = StringIO.new
  captured_stderr = StringIO.new
  $stdout = captured_stdout
  $stderr = captured_stderr

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
  ActiveSupport::TestCase.fixture_path = File.expand_path('../fixtures', __FILE__)
end

if ActiveSupport::TestCase.respond_to?(:test_order=)
  ActiveSupport::TestCase.test_order = :random
end

def wait_for_turbolinks_to_be_available
  sleep(1)
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

def expected_working_jsx
  /\.createElement\(\s*\S*\.Fragment,\s*null,\s*\"Name:\s*\",\s*this\.props\.name,\s*\"Address:\s*\",\s*this\.props\.address\s*\)/x
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
