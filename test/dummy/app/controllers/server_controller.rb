class ServerController < ApplicationController
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
end
