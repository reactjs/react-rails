require 'test_helper'

require 'capybara/rails'
require 'capybara/poltergeist'

Capybara.javascript_driver = :poltergeist
Capybara.app = Rails.application

class ViewHelperTest < ActionDispatch::IntegrationTest
  include Capybara::DSL

  setup do
    Capybara.current_driver = Capybara.javascript_driver
  end

  test 'assert render_component works' do
    visit '/pages/1'
    assert page.has_content?('Hello Bob')

    page.click_button 'Goodbye'
    assert page.has_no_content?('Hello Bob')
    assert page.has_content?('Goodbye Bob')
  end

  test 'assert render_component works with turbolinks' do
    visit '/pages/1'
    assert page.has_content?('Hello Bob')

    # Try clicking links.
    page.click_link('Alice')
    assert page.has_content?('Hello Alice')

    page.click_link('Bob')
    assert page.has_content?('Hello Bob')

    # Try Turbolinks javascript API.
    page.execute_script('Turbolinks.visit("/pages/2");')
    assert page.has_content?('Hello Alice')

    page.execute_script('Turbolinks.visit("/pages/1");')
    assert page.has_content?('Hello Bob')

    # Component state is not persistent after clicking current page link.
    page.click_button 'Goodbye'
    assert page.has_content?('Goodbye Bob')

    page.click_link('Bob')
    assert page.has_content?('Hello Bob')
  end
end
