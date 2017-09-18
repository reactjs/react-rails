require 'test_helper'

SprocketsHelpers.when_available do
  class ReactRailsUJSTest < ActionDispatch::IntegrationTest
    include Capybara::DSL

    compiled = false
    setup do
      unless compiled
        React::ServerRendering.reset_pool
        WebpackerHelpers.compile
      end
    end

    # Normalize for webpacker check:
    def assert_greeting(page, plain_greeting, refute: false)
      normalized_greeting = if WebpackerHelpers.available?
        greeting, name = plain_greeting.split(' ')
        "#{greeting} from Webpacker #{name}"
      else
        plain_greeting
      end

      if refute
        assert page.has_no_content?(normalized_greeting), page.body
      else
        assert page.has_content?(normalized_greeting), page.body
      end
    end

    def refute_greeting(page, greeting)
      assert_greeting(page, greeting, refute: true)
    end

    test 'ujs object present on the global React object and has our methods' do
      visit '/pages/1'
      assert_greeting(page, 'Hello Bob')

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
      assert_greeting(page, 'Hello Bob')

      page.click_button 'Goodbye'
      refute_greeting(page, 'Hello Bob')
      assert_greeting(page, 'Goodbye Bob')
    end

    test 'react_ujs works with Turbolinks' do
      visit '/pages/1'
      assert_greeting(page, 'Hello Bob')
      assert page.evaluate_script('Turbolinks.supported')

      # Try clicking links.
      page.click_link('Alice')
      wait_for_turbolinks_to_be_available
      assert_greeting(page, 'Hello Alice')

      page.click_link('Bob')
      wait_for_turbolinks_to_be_available
      assert_greeting(page, 'Hello Bob')

      # Try going back.
      page.execute_script('history.back();')
      wait_for_turbolinks_to_be_available
      assert_greeting(page, 'Hello Alice')

      # Try Turbolinks javascript API.
      page.execute_script('Turbolinks.visit("/pages/2");')
      wait_for_turbolinks_to_be_available
      assert_greeting(page, 'Hello Alice')

      page.execute_script('Turbolinks.visit("/pages/1");')
      wait_for_turbolinks_to_be_available
      assert_greeting(page, 'Hello Bob')

      # Component state is not persistent after clicking current page link.
      page.click_button 'Goodbye'
      assert_greeting(page, 'Goodbye Bob')

      page.click_link('Bob')
      wait_for_turbolinks_to_be_available
      assert_greeting(page, 'Hello Bob')
    end

    test 'react_ujs can unmount/mount using a selector reference for a component parent' do
      visit '/pages/1'
      assert_greeting(page, 'Hello Bob')

      page.click_button 'Unmount by parent selector'
      refute_greeting(page, 'Hello Bob')

      page.click_button 'Mount by parent selector'
      assert_greeting(page, 'Hello Bob')
    end

    test 'react_ujs can unmount/mount using a selector reference for the component' do
      visit '/pages/1'
      assert_greeting(page, 'Hello Bob')

      page.click_button 'Unmount by own selector'
      refute_greeting(page, 'Hello Bob')

      page.click_button 'Mount by own selector'
      assert_greeting(page, 'Hello Bob')
    end

    test 'react_ujs does not unmount components that do not match a selector reference for the component' do
      visit '/pages/1'
      assert_greeting page, 'Hello Bob'
      assert page.has_content?('Another Component'), page.body

      page.click_button 'Unmount by own selector'
      refute_greeting(page, 'Hello Bob')
      assert page.has_content?('Another Component'), page.body

      page.click_button 'Mount by own selector'
      assert_greeting(page, 'Hello Bob')
      assert page.has_content?('Another Component'), page.body
    end

    test 'react_ujs can unmount/mount using a dom node context' do
      visit '/pages/1'
      assert_greeting(page, 'Hello Bob')

      page.click_button 'Unmount by parent node'
      refute_greeting(page, 'Hello Bob')

      page.click_button 'Mount by parent node'
      assert_greeting(page, 'Hello Bob')
    end

    test 'react server rendering also gets mounted on client' do
      visit '/server/1'
      assert_match(/data-react-class=\"TodoList\"/, page.html)
      assert_match(/yep/, page.find('#status').text)
    end

    test 'react server rendering does not include internal properties' do
      visit '/server/1'
      assert_no_match(/tag=/, page.html)
      assert_no_match(/prerender=/, page.html)
    end
  end
end
