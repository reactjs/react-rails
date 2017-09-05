require 'test_helper'

DUMMY_IMPLEMENTATION = "
var Todo = null
var React = {
  createElement: function() {},
}
this.ReactRailsUJS = {
  serverRender: function() {
    return 'serverRender was called'
  },
}
"

class ExecJSRendererTest < ActiveSupport::TestCase
  setup do
    react_server_source = File.read(File.expand_path("../../../../lib/assets/react-source/production/react-server.js", __FILE__))
    react_ujs_source = File.read(File.expand_path("../../../../lib/assets/javascripts/react_ujs.js", __FILE__))
    todo_component_source = File.read(File.expand_path("../../../dummy/app/assets/javascripts/components/PlainJSTodo.js", __FILE__))
    code = react_server_source + react_ujs_source + todo_component_source
    @renderer = React::ServerRendering::ExecJSRenderer.new(code: code)
  end

  def test_render_returns_HTML
    result = @renderer.render("Todo", {todo: "write tests"}.to_json, {})
    assert_match(/<li.*write tests<\/li>/, result)
    assert_match(/data-react-checksum/, result)
  end

  def test_render_accepts_render_function
    result = @renderer.render("Todo", {todo: "write more tests"}.to_json, render_function: "renderToStaticMarkup")
    assert_match(/<li>write more tests<\/li>/, result)
    assert_no_match(/data-react-checksum/, result)
  end

  def test_before_render_is_called_before_after_render
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

  def test_after_render_is_called_after_before_render
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

  def test_new_accepts_code
    dummy_renderer = React::ServerRendering::ExecJSRenderer.new(code: DUMMY_IMPLEMENTATION)
    result = dummy_renderer.render("Todo", {todo: "get a real job"}.to_json, {})
    assert_equal("serverRender was called", result)
  end
end
