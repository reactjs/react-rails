class ServerController < ApplicationController
  DUMMY_IMPLEMENTATION = "
  var Todo = null
  var React = {
    createElement: function() {},
  }
  var ReactDOMServer = {
    renderToString: function() {
      return 'renderToString was called'
    },
  }
  "

  def show
    @todos = %w{todo1 todo2 todo3}
  end

  def console_example
    React::ServerRendering.renderer_options = {replay_console:  true}
    React::ServerRendering.reset_pool
    @todos = %w{todo1 todo2 todo3}
  end

  def console_example_suppressed
    React::ServerRendering.renderer_options = {replay_console:  false}
    React::ServerRendering.reset_pool
    @todos = %w{todo1 todo2 todo3}
  end

  def exec_js_renderer
    React::ServerRendering.renderer = React::ServerRendering::ExecJSRenderer
    React::ServerRendering.renderer_options[:code] = DUMMY_IMPLEMENTATION
    React::ServerRendering.reset_pool
    @todos = %w{todo1 todo2 todo3}
  end

  def inline_component
    render component: 'TodoList',
           props: { todos: ['Render this inline'] },
           tag: 'span',
           class: 'custom-class',
           id: 'custom-id',
           data: { remote: true }
  end
end
