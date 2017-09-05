require "test_helper"

if WebpackerHelpers.available? || SprocketsHelpers.available?
  class ConsoleReplayTest < ActionDispatch::IntegrationTest
    setup do
      WebpackerHelpers.compile
      React::ServerRendering.renderer_options = {replay_console: true}
      React::ServerRendering.reset_pool
    end

    EXPECTED_REPLAY = <<-HTML
<script class="react-rails-console-replay">
console.log.apply(console, ["Test Console Replay"]);
</script>
    HTML

    def test_it_clears_the_state_between_each_request
      # Each request should only contain one log:
      get '/server/1'
      assert_includes(response.body, EXPECTED_REPLAY)
      get '/server/1'
      assert_includes(response.body, EXPECTED_REPLAY)
    end
  end
end
