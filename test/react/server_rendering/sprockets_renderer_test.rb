require 'test_helper'

class SprocketsRendererTest < ActiveSupport::TestCase
  setup do
    @renderer = React::ServerRendering::SprocketsRenderer.new({})
  end

  test '#render returns HTML' do
    result = @renderer.render("Todo", {todo: "write tests"})
    assert_match(/<li.*write tests<\/li>/, result)
    assert_match(/data-react-checksum/, result)
  end

  test '#render accepts strings' do
    result = @renderer.render("Todo", {todo: "write more tests"}.to_json)
    assert_match(/<li.*write more tests<\/li>/, result)
  end

  test '#render accepts prerender: :static' do
    result = @renderer.render("Todo", {todo: "write more tests", prerender: :static})
    assert_match(/<li>write more tests<\/li>/, result)
    assert_no_match(/data-react-checksum/, result)
  end

  test '#render replays console messages' do
    result = @renderer.render("TodoListWithConsoleLog", {todos: ["log some messages"]})
    assert_match(/console.log.apply\(console, \["got initial state"\]\)/, result)
    assert_match(/console.warn.apply\(console, \["mounted component"\]\)/, result)
    assert_match(/console.error.apply\(console, \["rendered!","foo"\]\)/, result)
  end

  test '#render console messages can be disabled' do
    no_log_renderer = React::ServerRendering::SprocketsRenderer.new({replay_console: false})
    result = no_log_renderer.render("TodoListWithConsoleLog", {todos: ["log some messages"]})
    assert_no_match(/console.log.apply\(console, \["got initial state"\]\)/, result)
    assert_no_match(/console.warn.apply\(console, \["mounted component"\]\)/, result)
    assert_no_match(/console.error.apply\(console, \["rendered!","foo"\]\)/, result)
  end

  test '#render errors include stack traces' do
    err = assert_raises React::ServerRendering::SprocketsRenderer::PrerenderError do
      @renderer.render("NonExistentComponent", {})
    end
    assert_match(/ReferenceError/, err.to_s)
    assert_match(/NonExistentComponent/, err.to_s, "it names the component")
    assert_match(/\n/, err.to_s, "it includes the multi-line backtrace")
  end

  test '.new accepts any filenames' do
    limited_renderer = React::ServerRendering::SprocketsRenderer.new(files: ["react.js", "components/Todo.js"])
    assert_match(/get a real job<\/li>/, limited_renderer.render("Todo", {todo: "get a real job"}))
    err = assert_raises React::ServerRendering::SprocketsRenderer::PrerenderError do
      limited_renderer.render("TodoList", {todos: []})
    end
    assert_match(/ReferenceError/, err.to_s, "it doesnt load other files")
  end
end