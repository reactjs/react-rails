require 'test_helper'

SprocketsHelpers.when_available do
  class ReactRailsUJSTest < ActionDispatch::IntegrationTest
    include Capybara::DSL

    compiled = false
    setup do
      if !compiled
        React::ServerRendering.reset_pool
        WebpackerHelpers.compile
      end
    end

    # Normalize for webpacker check:
    def assert_greeting(page, plain_greeting, refute: false)
      normalized_greeting = if WebpackerHelpers.available?
        greeting, name = plain_greeting.split(" ")
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

    def test_ujs_object_present_on_the_global_React_object_and_has_our_methods
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

    def test_react_ujs_works_with_rendered_HTML
      visit '/pages/1'
      assert_greeting(page, 'Hello Bob')

      page.click_button 'Goodbye'
      refute_greeting(page, 'Hello Bob')
      assert_greeting(page, 'Goodbye Bob')
    end

    def test_react_ujs_works_with_Turbolinks
      visit '/pages/1'
      assert_greeting(page, 'Hello Bob')
      assert page.evaluate_script("Turbolinks.supported")

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

    def test_react_ujs_can_unmount_and_mount_using_a_selector_reference_for_a_component_parent
      visit '/pages/1'
      assert_greeting(page, 'Hello Bob')

      page.click_button "Unmount by parent selector"
      refute_greeting(page, 'Hello Bob')

      page.click_button "Mount by parent selector"
      assert_greeting(page, 'Hello Bob')
    end

    def test_react_ujs_can_unmount_and_mount_using_a_selector_reference_for_the_component
      visit '/pages/1'
      assert_greeting(page, 'Hello Bob')

      page.click_button "Unmount by own selector"
      refute_greeting(page, 'Hello Bob')

      page.click_button "Mount by own selector"
      assert_greeting(page, 'Hello Bob')
    end

    def test_react_ujs_does_not_unmount_components_that_do_not_match_a_selector_reference_for_the_component
      visit '/pages/1'
      assert_greeting page, 'Hello Bob'
      assert page.has_content?('Another Component'), page.body

      page.click_button "Unmount by own selector"
      refute_greeting(page, 'Hello Bob')
      assert page.has_content?('Another Component'), page.body

      page.click_button "Mount by own selector"
      assert_greeting(page, 'Hello Bob')
      assert page.has_content?('Another Component'), page.body
    end


    def test_react_ujs_can_unmount_and_mount_using_a_dom_node_context
      visit '/pages/1'
      assert_greeting(page, 'Hello Bob')

      page.click_button "Unmount by parent node"
      refute_greeting(page, 'Hello Bob')

      page.click_button "Mount by parent node"
      assert_greeting(page, 'Hello Bob')
    end

    def test_react_server_rendering_also_gets_mounted_on_client
      visit '/server/1'
      assert_match(/data-react-class=\"TodoList\"/, page.html)
      assert_match(/yep/, page.find("#status").text)
    end

    def test_react_server_rendering_does_not_include_internal_properties
      visit '/server/1'
      assert_no_match(/tag=/, page.html)
      assert_no_match(/prerender=/, page.html)
    end
  end
end
