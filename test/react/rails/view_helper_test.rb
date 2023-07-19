# frozen_string_literal: true

require "test_helper"

# Provide direct access to the view helper methods
class ViewHelperHelper
  extend ActionView::Context
  extend ActionView::Helpers::CaptureHelper
  extend React::Rails::ViewHelper
end

class ViewHelperTest < ActionView::TestCase
  test "view helper can be called directly" do
    expected_html = %(<div data-react-class="Component" data-react-props="{&quot;a&quot;:&quot;b&quot;}" data-react-cache-id="Component-0"></div>) # rubocop:disable Layout/LineLength
    rendered_html = ViewHelperHelper.react_component("Component", { a: "b" })

    assert_equal(expected_html, rendered_html)
  end

  test "view helper accepts block usage" do
    expected_html = %(<div data-react-class="Component" data-react-props="{&quot;a&quot;:&quot;b&quot;}" data-react-cache-id="Component-0">content</div>) # rubocop:disable Layout/LineLength
    rendered_html = ViewHelperHelper.react_component("Component", { a: "b" }) do
      "content"
    end

    assert_equal(expected_html, rendered_html)
  end

  test "view helper can be used in stand-alone views" do
    @name = "React-Rails"
    render template: "pages/show"

    assert_includes(rendered, "React-Rails")
  end

  test "view helper can accept block and render inner content only once" do
    rendered_html = render partial: "pages/component_with_inner_html"
    expected_html = <<~HTML
      <div data-react-class="GreetingMessage" data-react-props="{&quot;name&quot;:&quot;Name&quot;}" data-react-cache-id="GreetingMessage-0" id="component">
        <div id="unique-nested-id">NestedContent</div>
      </div>
    HTML
    assert_equal expected_html.strip, rendered_html
  end

  test "view helper uses the implementation class set in the initializer" do
    assert_equal("CustomComponentMount", React::Rails::ViewHelper.helper_implementation_class.to_s)
  end
end
