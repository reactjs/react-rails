require 'test_helper'

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

class ViewHelperTest < ActionDispatch::IntegrationTest
  include Capybara::DSL

  setup do
    @helper = ActionView::Base.new.extend(React::Rails::ViewHelper)
    Capybara.current_driver = Capybara.javascript_driver
  end

  test 'react_component accepts React props' do
    html = @helper.react_component('Foo', {bar: 'value'})
    %w(data-react-class="Foo" data-react-props="{&quot;bar&quot;:&quot;value&quot;}").each do |segment|
      assert html.include?(segment)
    end
  end

  test 'react_component accepts HTML options and HTML tag' do
    assert @helper.react_component('Foo', {}, :span).match(/<span\s.*><\/span>/)

    html = @helper.react_component('Foo', {}, {:class => 'test', :tag => :span, :data => {:foo => 1}})
    assert html.match(/<span\s.*><\/span>/)
    assert html.include?('class="test"')
    assert html.include?('data-foo="1"')
  end

  test 'react_ujs works with rendered HTML' do
    visit '/pages/1'
    assert page.has_content?('Hello Bob')

    page.click_button 'Goodbye'
    assert page.has_no_content?('Hello Bob')
    assert page.has_content?('Goodbye Bob')
  end

  test 'react_ujs works with Turbolinks' do
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

  test 'react server rendering also gets mounted on client' do
    visit '/server/1'
    assert_match /data-react-class=\"TodoList\"/, page.html
    assert_match /data-react-checksum/, page.html
    assert_match /yep/, page.find("#status").text
  end
end
