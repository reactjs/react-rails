require "test_helper"

# Provide direct access to the view helper methods
class ViewHelperHelper
  extend ActionView::Context
  extend ActionView::Helpers::CaptureHelper
  extend React::Rails::ViewHelper

end

class ViewHelperTest < ActionView::TestCase
  def test_view_helper_can_be_called_directly
    expected_html = %{<div data-react-class="Component" data-react-props="{&quot;a&quot;:&quot;b&quot;}"></div>}
    rendered_html = ViewHelperHelper.react_component("Component", {a: "b"})
    assert_equal(expected_html, rendered_html)
  end

  def test_view_helper_accepts_block_usage
    expected_html = %{<div data-react-class="Component" data-react-props="{&quot;a&quot;:&quot;b&quot;}">content</div>}
    rendered_html = ViewHelperHelper.react_component("Component", {a: "b"}) do
      "content"
    end
    assert_equal(expected_html, rendered_html)
  end

  def test_view_helper_can_be_used_in_stand_alone_views
    @name = "React-Rails"
    render template: "pages/show"
    assert_includes(rendered, "React-Rails")
  end

  def test_view_helper_can_accept_block_and_render_inner_content_only_once
    rendered_html = render partial: "pages/component_with_inner_html"
    expected_html = <<HTML
<div data-react-class=\"GreetingMessage\" data-react-props=\"{&quot;name&quot;:&quot;Name&quot;}\" id=\"component\">
  <div id=\"unique-nested-id\">NestedContent</div>
</div>
HTML
    assert_equal expected_html.strip, rendered_html
  end


  def test_view helper uses the implementation class set in the initializer" do
    assert_equal(
      React::Rails::ViewHelper.helper_implementation_class.to_s,
      "CustomComponentMount"
    )
  end
end
