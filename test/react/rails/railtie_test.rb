require "test_helper"

class RailtieTest < ActionDispatch::IntegrationTest
  def test_reloaders_are_configured_after_initializers_are_loaded
    @test_file = File.expand_path("../../dummy/app/pants/yfronts.js", File.dirname(__FILE__))
    FileUtils.touch @test_file
    results = Dummy::Application.reloaders.map(&:updated?)
    assert_includes(results, true)
  end
end
