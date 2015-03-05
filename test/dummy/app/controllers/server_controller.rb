class ServerController < ApplicationController
  def show
    @todos = %w{todo1 todo2 todo3}
  end

  def console_example
    hack_replay_console_config true
    @todos = %w{todo1 todo2 todo3}
  end

  def console_example_suppressed
    hack_replay_console_config false
    @todos = %w{todo1 todo2 todo3}
  end

  private
  def hack_replay_console_config(value)
    # Don't do this in your app; just set it how you want it in config/application.rb
    cfg = ::Rails.application.config.react
    cfg.replay_console = value
    React::Renderer.setup!( cfg.react_js, cfg.components_js, cfg.replay_console,
                        {:size => cfg.max_renderers, :timeout => cfg.timeout})
  end
end
