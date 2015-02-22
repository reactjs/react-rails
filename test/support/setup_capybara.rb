require 'capybara/rails'
require 'capybara/poltergeist'

Capybara.javascript_driver = :poltergeist
Capybara.app = Rails.application

# Useful for debugging.
# Just put page.driver.debug in your test and it will
# pause and throw up a browser
Capybara.register_driver :poltergeist_debug do |app|
  Capybara::Poltergeist::Driver.new(app, :inspector => true)
end
Capybara.javascript_driver = :poltergeist_debug
