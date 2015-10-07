require 'test_helper'

DUMMY_IMPLEMENTATION = "
var Todo = null
var React = {
  renderToString: function() {
    return 'renderToString was called'
  },
  createElement: function() {}
}
"

class ExecJSRendererTest < ActiveSupport::TestCase
  setup do
    react_source = Rails.application.assets["react.js"].to_s
    react_dom_source = Rails.application.assets["react-dom.js"].to_s
    todo_component_source = Rails.application.assets["components/Todo.js"].to_s
    prerender_env_code = react_source + react_dom_source + todo_component_source
    @renderer = React::ServerRendering::ExecJSRenderer.new(code: prerender_env_code)
  end

  test '#render returns HTML' do
    result = @renderer.render("Todo", {todo: "write tests"}.to_json, {})
    assert_match(/<li.*write tests<\/li>/, result)
    assert_match(/data-react-checksum/, result)
  end

  test '#render accepts render_function:' do
    result = @renderer.render("Todo", {todo: "write more tests"}.to_json, render_function: "renderToStaticMarkup")
    assert_match(/<li>write more tests<\/li>/, result)
    assert_no_match(/data-react-checksum/, result)
  end

  test '#before_render is called before #after_render' do
    def @renderer.before_render(name, props, opts)
      "throw 'before_render ' + afterRenderVar"
    end

    def @renderer.after_render(name, props, opts)
      "var afterRenderVar = 'assigned_after_render'"
    end

    error = assert_raises(React::ServerRendering::PrerenderError) do
      @renderer.render("Todo", {todo: "write tests"}.to_json, {})
    end

    assert_match(/before_render/, error.message)
    assert_no_match(/assigned_after_render/, error.message)
  end


  test '#after_render is called after #before_render' do
    def @renderer.before_render(name, props, opts)
      "var beforeRenderVar = 'assigned_before_render'"
    end

    def @renderer.after_render(name, props, opts)
      "throw 'after_render ' + beforeRenderVar"
    end

    error = assert_raises(React::ServerRendering::PrerenderError) do
      @renderer.render("Todo", {todo: "write tests"}.to_json, {})
    end

    assert_match(/after_render/, error.message)
    assert_match(/assigned_before_render/, error.message)
  end

  test '.new accepts code:' do
    dummy_renderer = React::ServerRendering::ExecJSRenderer.new(code: DUMMY_IMPLEMENTATION)
    result = dummy_renderer.render("Todo", {todo: "get a real job"}.to_json, {})
    assert_equal("renderToString was called", result)
  end
end
