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

class ReactRailsUJSTest < ActionDispatch::IntegrationTest
  include Capybara::DSL

  setup do
    Capybara.current_driver = Capybara.javascript_driver
  end

  test 'ujs object present on the global React object and has our methods' do
    visit '/pages/1'
    assert page.has_content?('Hello Bob')

    # the exposed ujs object is present
    ujs_present = page.evaluate_script('typeof ReactRailsUJS === "object";')
    assert_equal(ujs_present, true)

    # it contains the constants
    class_name_present = page.evaluate_script('ReactRailsUJS.CLASS_NAME_ATTR === "data-react-class";')
    assert_equal(class_name_present, true)
    props_present = page.evaluate_script('ReactRailsUJS.PROPS_ATTR === "data-react-props";')
    assert_equal(props_present, true)

    #it contains the methods
    find_dom_nodes_present = page.evaluate_script('typeof ReactRailsUJS.findDOMNodes === "function";')
    assert_equal(find_dom_nodes_present, true)
    mount_components_present = page.evaluate_script('typeof ReactRailsUJS.mountComponents === "function";')
    assert_equal(mount_components_present, true)
    unmount_components_present = page.evaluate_script('typeof ReactRailsUJS.unmountComponents === "function";')
    assert_equal(unmount_components_present, true)
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
    assert page.evaluate_script("Turbolinks.supported")

    # Try clicking links.
    page.click_link('Alice')
    wait_for_turbolinks_to_be_available
    assert page.has_content?('Hello Alice')

    page.click_link('Bob')
    wait_for_turbolinks_to_be_available
    assert page.has_content?('Hello Bob')

    # Try going back.
    page.execute_script('history.back();')
    wait_for_turbolinks_to_be_available
    assert page.has_content?('Hello Alice')

    # Try Turbolinks javascript API.
    page.execute_script('Turbolinks.visit("/pages/2");')
    wait_for_turbolinks_to_be_available
    assert page.has_content?('Hello Alice')


    page.execute_script('Turbolinks.visit("/pages/1");')
    wait_for_turbolinks_to_be_available
    assert page.has_content?('Hello Bob')

    # Component state is not persistent after clicking current page link.
    page.click_button 'Goodbye'
    assert page.has_content?('Goodbye Bob')

    page.click_link('Bob')
    wait_for_turbolinks_to_be_available
    assert page.has_content?('Hello Bob')
  end

  test 'react_ujs can unmount/mount using a selector reference for a component parent' do
    visit '/pages/1'
    assert page.has_content?('Hello Bob')

    page.click_link "Unmount at selector #component-parent"
    assert page.has_no_content?('Hello Bob')

    page.click_link "Mount at selector #component-parent"
    assert page.has_content?('Hello Bob')
  end

  test 'react_ujs can unmount/mount using a selector reference for the component' do
    visit '/pages/1'
    assert page.has_content?('Hello Bob')

    page.click_link "Unmount at selector #component"
    assert page.has_no_content?('Hello Bob')

    page.click_link "Mount at selector #component"
    assert page.has_content?('Hello Bob')
  end

  test 'react_ujs can unmount/mount using a dom node context' do
    visit '/pages/1'
    assert page.has_content?('Hello Bob')

    page.click_link "Unmount at node #component-parent"
    assert page.has_no_content?('Hello Bob')

    page.click_link "Mount at node #component-parent"
    assert page.has_content?('Hello Bob')
  end

  test 'react server rendering also gets mounted on client' do
    visit '/server/1'
    assert_match(/data-react-class=\"TodoList\"/, page.html)
    assert_match(/yep/, page.find("#status").text)
  end

  test 'react server rendering does not include internal properties' do
    visit '/server/1'
    assert_no_match(/tag=/, page.html)
    assert_no_match(/prerender=/, page.html)
  end
end
