require "test_helper"

# Provide direct access to the view helper methods
class ViewHelperHelper
  extend React::Rails::ViewHelper
end

class ViewHelperTest < ActionView::TestCase
  test "view helper can be called directly" do
    expected_html = %{<div data-react-class="Component" data-react-props="{&quot;a&quot;:&quot;b&quot;}"></div>}
    rendered_html = ViewHelperHelper.react_component("Component", {a: "b"})
    assert_equal(expected_html, rendered_html)
  end

  test "view helper can be used in stand-alone views" do
    @name = "React-Rails"
    render template: "pages/show"
    assert_includes(rendered, "React-Rails")
  end
end
