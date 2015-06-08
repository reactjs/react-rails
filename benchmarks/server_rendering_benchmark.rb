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
React::ServerRendering.pool_timeout = 10

def test_runtime(runtime, renders:, pool_size:)
  ExecJS.runtime = runtime
  React::ServerRendering.pool_size = pool_size
  React::ServerRendering.reset_pool

  renders.times do
    React::ServerRendering.render("SlowComponent", {}, {})
  end
end

RUNTIMES = [
  ExecJS::Runtimes::RubyRacer,
  ExecJS::Runtimes::Duktape,
  ExecJS::Runtimes::JavaScriptCore,
  ExecJS::Runtimes::Node,
]

Benchmark.bm(25) do |x|
  [1, 10, 25].each do |pool_size|
    RUNTIMES.each do |runtime|
      x.report("#{runtime.name}, #{pool_size}x") { test_runtime(runtime, renders: 50, pool_size: pool_size)}
    end
  end
end