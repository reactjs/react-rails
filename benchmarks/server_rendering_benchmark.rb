# - `gem install duktape`
# - Remove `JavaScriptCore` from RUNTIMES if you're not on mac
# - `ruby -I lib  benchmarks/server_rendering_benchmark.rb`

require 'react-rails'
require 'duktape'
require 'benchmark'

SLOW_COMPONENT = "
var SlowComponent = React.createClass({
  render: function() {
    var rand = 0
    for (var i = 0; i < 10000; i++) {
      rand = rand + (Math.random() * i)
    }
    return React.createElement('h1', rand + ' :)')
  }
})
"

REACT_JS_PATH = File.expand_path("../../vendor/react/react.js", __FILE__)
JS_CODE = File.read(REACT_JS_PATH) + SLOW_COMPONENT

React::ServerRendering.renderer = React::ServerRendering::ExecJSRenderer
React::ServerRendering.renderer_options = {code: JS_CODE}
React::ServerRendering.pool_timeout = 1000

def test_runtime(runtime, renders:, pool_size:, threaded:, thread_size:)
  ExecJS.runtime = runtime
  React::ServerRendering.pool_size = pool_size
  React::ServerRendering.reset_pool
  if threaded
    threads = thread_size.times.map do
      Thread.new do
        renders.times do
          React::ServerRendering.render("SlowComponent", {}, {})
          Thread.pass
        end
      end
    end
    threads.map(&:join)
  else
    renders.times.map do
      React::ServerRendering.render("SlowComponent", {}, {})
    end
  end
end

RUNTIMES = [
  ExecJS::Runtimes::RubyRacer,
  ExecJS::Runtimes::Duktape,
  ExecJS::Runtimes::JavaScriptCore,
  ExecJS::Runtimes::Node,
]

Benchmark.bm(45) do |x|
  [true, false].each do |threaded|
    [1, 10, 25].each do |pool_size|
      [1, 2, 4, 8].each do |thread_size|
        RUNTIMES.each do |runtime|
          x.report("#{threaded ? "threaded, " : ""}#{pool_size} conn, #{thread_size} threads, #{runtime.name}") do
            test_runtime(runtime, renders: 100, pool_size: pool_size, threaded: true, thread_size: thread_size)
          end
        end
      end
    end
  end
end
