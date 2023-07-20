# frozen_string_literal: true

require "test_helper"

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
    react_server_source = File.read(File.expand_path("../../../lib/assets/react-source/production/react-server.js",
                                                     __dir__))
    react_ujs_source = File.read(File.expand_path("../../../lib/assets/javascripts/react_ujs.js", __dir__))
    todo_component_source = File.read(
      File.expand_path(
        "../../../#{DUMMY_LOCATION}/app/assets/javascripts/components/PlainJSTodo.js", __FILE__
      )
    )
    code = react_server_source + react_ujs_source + todo_component_source
    @renderer = React::ServerRendering::ExecJSRenderer.new(code: code)
  end

  test "#render returns HTML" do
    result = @renderer.render("Todo", { todo: "write tests" }.to_json, {})

    assert_match(%r{<li.*write tests</li>}, result)
  end

  test "#render accepts render_function:" do
    result = @renderer.render("Todo", { todo: "write more tests" }.to_json, render_function: "renderToStaticMarkup")

    assert_match(%r{<li>write more tests</li>}, result)
  end

  test "#before_render is called before #after_render" do
    def @renderer.before_render(_name, _props, _opts)
      "throw 'before_render ' + afterRenderVar"
    end

    def @renderer.after_render(_name, _props, _opts)
      "var afterRenderVar = 'assigned_after_render'"
    end

    error = assert_raises(React::ServerRendering::PrerenderError) do
      @renderer.render("Todo", { todo: "write tests" }.to_json, {})
    end

    assert_match(/before_render/, error.message)
    assert_no_match(/assigned_after_render/, error.message)
  end

  test "#after_render is called after #before_render" do
    def @renderer.before_render(_name, _props, _opts)
      "var beforeRenderVar = 'assigned_before_render'"
    end

    def @renderer.after_render(_name, _props, _opts)
      "throw 'after_render ' + beforeRenderVar"
    end

    error = assert_raises(React::ServerRendering::PrerenderError) do
      @renderer.render("Todo", { todo: "write tests" }.to_json, {})
    end

    assert_match(/after_render/, error.message)
    assert_match(/assigned_before_render/, error.message)
  end

  test ".new accepts code:" do
    dummy_renderer = React::ServerRendering::ExecJSRenderer.new(code: DUMMY_IMPLEMENTATION)
    result = dummy_renderer.render("Todo", { todo: "get a real job" }.to_json, {})

    assert_equal("serverRender was called", result)
  end
end
