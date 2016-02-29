require 'test_helper'

class SprocketsRendererTest < ActiveSupport::TestCase
  setup do
    @renderer = React::ServerRendering::SprocketsRenderer.new({})
  end

  test '#render returns HTML' do
    result = @renderer.render("Todo", {todo: "write tests"}, nil)
    assert_match(/<li.*write tests<\/li>/, result)
    assert_match(/data-react-checksum/, result)
  end

  test '#render accepts strings' do
    result = @renderer.render("Todo", {todo: "write more tests"}.to_json, nil)
    assert_match(/<li.*write more tests<\/li>/, result)
  end

  test '#render accepts :static pre-render option' do
    result = @renderer.render("Todo", {todo: "write more tests"}, :static)
    assert_match(/<li>write more tests<\/li>/, result)
    assert_no_match(/data-react-checksum/, result)
  end

  test '#render replays console messages' do
    result = @renderer.render("TodoListWithConsoleLog", {todos: ["log some messages"]}, nil)
    assert_match(/console.log.apply\(console, \["got initial state"\]\)/, result)
    assert_match(/console.warn.apply\(console, \["mounted component"\]\)/, result)
    assert_match(/console.error.apply\(console, \["rendered!","foo"\]\)/, result)
  end

  test '#render console messages can be disabled' do
    no_log_renderer = React::ServerRendering::SprocketsRenderer.new({replay_console: false})
    result = no_log_renderer.render("TodoListWithConsoleLog", {todos: ["log some messages"]}, nil)
    assert_no_match(/console.log.apply\(console, \["got initial state"\]\)/, result)
    assert_no_match(/console.warn.apply\(console, \["mounted component"\]\)/, result)
    assert_no_match(/console.error.apply\(console, \["rendered!","foo"\]\)/, result)
  end

  test '#render errors include stack traces' do
    err = assert_raises React::ServerRendering::PrerenderError do
      @renderer.render("NonExistentComponent", {}, nil)
    end
    assert_match(/ReferenceError/, err.to_s)
    assert_match(/NonExistentComponent/, err.to_s, "it names the component")
    assert_match(/\n/, err.to_s, "it includes the multi-line backtrace")
  end

  test '.new accepts any filenames' do
    limited_renderer = React::ServerRendering::SprocketsRenderer.new(files: ["react-server.js", "components/Todo.js"])
    assert_match(/get a real job<\/li>/, limited_renderer.render("Todo", {todo: "get a real job"}, nil))
    err = assert_raises React::ServerRendering::PrerenderError do
      limited_renderer.render("TodoList", {todos: []}, nil)
    end
    assert_match(/ReferenceError/, err.to_s, "it doesnt load other files")
  end

  test '#render returns html when config.assets.compile is false' do
    begin
      precompile_assets

      Rails.application.config.assets.compile = false

      @renderer = React::ServerRendering::SprocketsRenderer.new({})

      result = @renderer.render("Todo", {todo: "write tests"}, nil)
      assert_match(/<li.*write tests<\/li>/, result)
      assert_match(/data-react-checksum/, result)
    ensure
      Rails.application.config.assets.compile = true

      clear_precompiled_assets
    end
  end
end
